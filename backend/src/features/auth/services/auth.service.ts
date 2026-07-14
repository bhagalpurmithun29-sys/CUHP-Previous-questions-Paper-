import mongoose from 'mongoose';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterRequestDTO, RegisterResponseDTO, UserResponseDTO } from '../dtos/register.dto';
import { BadRequestError } from '../../../utils/ApiError';
import { logger } from '../../../utils/logger';
import { TokenUtil } from '../utils/token.util';
import { AuthAction, AccountStatus } from '../../../enums/auth.enum';
import { LoginRequestDTO, LoginResponseDTO } from '../dtos/login.dto';
import { TokenService } from './token.service';
import { RefreshTokenService } from './refresh-token.service';
import { SessionService } from './session.service';
import { UnauthorizedError, ForbiddenError } from '../../../utils/ApiError';
import { Request } from 'express';
import { trustedDeviceService } from '../../../services/auth/mfa/TrustedDeviceService';
import { mfaService } from '../../../services/auth/mfa/MfaService';
import jwt from 'jsonwebtoken';

export class AuthService {
  /**
   * Handles the complete user registration business logic
   */
  static async register(userData: RegisterRequestDTO, ipAddress: string): Promise<RegisterResponseDTO> {
    logger.info(`Registration started for email: ${userData.email}`);

    // Normalize email
    const normalizedEmail = userData.email.toLowerCase().trim();
    userData.email = normalizedEmail;

    // Start MongoDB Transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Check if user already exists
      const existingUser = await AuthRepository.findUserByEmail(normalizedEmail, session);
      if (existingUser) {
        logger.warn(`Duplicate registration attempt for email: ${normalizedEmail}`);
        
        // Log the failed attempt asynchronously
        await AuthRepository.createAuditLog(
          AuthAction.FAILED_LOGIN, // Using FAILED_LOGIN or custom REGISTER_FAILED
          normalizedEmail,
          ipAddress,
          { reason: 'EMAIL_ALREADY_EXISTS' }
        );

        throw new BadRequestError('Email address is already registered');
      }

      // 2. Create User (Password hashing is handled in Mongoose pre-save hook)
      const newUser = await AuthRepository.createUser(userData, session);

      // 3. Generate Verification Token
      const rawToken = TokenUtil.generateSecureToken();
      const hashedToken = TokenUtil.hashToken(rawToken);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiry

      // 4. Save Token
      await AuthRepository.saveVerificationToken(newUser._id, hashedToken, expiresAt, session);

      // 5. Audit Log Success
      await AuthRepository.createAuditLog(
        AuthAction.LOGIN, // Placeholder for REGISTER_SUCCESS
        normalizedEmail,
        ipAddress,
        { action: 'REGISTER_SUCCESS' },
        newUser._id,
        session
      );

      // Commit transaction
      await session.commitTransaction();
      logger.info(`Successfully registered user: ${newUser._id}`);

      // 6. Trigger Email Service (Asynchronous, outside transaction)
      // TODO: emailService.sendVerificationEmail(newUser.email, newUser.firstName, rawToken);
      const verificationUrl = `/verify-email?token=${rawToken}`;
      logger.info(`Verification email generated for ${normalizedEmail}. URL placeholder: ${verificationUrl}`);

      // 7. Format Response DTO
      const userResponse: UserResponseDTO = {
        id: newUser._id.toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        accountStatus: newUser.accountStatus,
        emailVerified: newUser.emailVerified,
        department: newUser.department?.toString(),
        course: newUser.course?.toString(),
        semester: newUser.semester,
        createdAt: newUser.createdAt
      };

      return {
        user: userResponse,
        requiresEmailVerification: true,
        message: 'Registration successful. Please check your email to verify your account.'
      };

    } catch (error) {
      await session.abortTransaction();
      logger.error(`Registration failed for ${normalizedEmail}: `, error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Handles user login, password verification, and token issuance
   */
  static async login(loginData: LoginRequestDTO, req: Request): Promise<LoginResponseDTO> {
    const normalizedEmail = loginData.email.toLowerCase().trim();
    logger.info(`Login attempt for: ${normalizedEmail}`);
    const ipAddress = req.ip || 'unknown';

    // 1. Find user (must include password for comparison)
    const user = await AuthRepository.findUserByEmailWithPassword(normalizedEmail);

    if (!user) {
      await AuthRepository.createAuditLog(AuthAction.FAILED_LOGIN, normalizedEmail, ipAddress, { reason: 'USER_NOT_FOUND' });
      throw new UnauthorizedError('Invalid email or password');
    }

    // 2. Check Account Status
    if (user.accountStatus === AccountStatus.PENDING_VERIFICATION) {
      // For local development, auto-verify the user to allow login
      if (process.env.NODE_ENV !== 'production') {
        user.accountStatus = AccountStatus.ACTIVE;
        user.emailVerified = true;
        await user.save();
        logger.info(`Auto-verified user ${user.email} in development mode`);
      } else {
        throw new ForbiddenError('Please verify your email address to continue');
      }
    }
    if (user.accountStatus === AccountStatus.SUSPENDED) {
      throw new ForbiddenError('Your account has been suspended. Please contact support.');
    }
    if (user.accountStatus === AccountStatus.BLOCKED) {
      throw new ForbiddenError('Your account has been blocked due to policy violations.');
    }

    // 3. Check if account is locked due to brute force attempts
    if (user.isLocked()) {
      await AuthRepository.createAuditLog(AuthAction.FAILED_LOGIN, normalizedEmail, ipAddress, { reason: 'ACCOUNT_LOCKED' }, user._id);
      throw new ForbiddenError('Account is temporarily locked due to too many failed attempts. Please try again later.');
    }

    // 4. Verify Password
    const isMatch = await user.matchPassword(loginData.password);

    if (!isMatch) {
      await user.incrementLoginAttempts();
      await AuthRepository.createAuditLog(AuthAction.FAILED_LOGIN, normalizedEmail, ipAddress, { reason: 'INVALID_PASSWORD' }, user._id);
      throw new UnauthorizedError('Invalid email or password');
    }

    // 5. Reset Failed Attempts & Update Last Login
    await user.resetLoginAttempts();

    // 6. Check MFA
    if (user.mfaEnabled) {
      const deviceCookie = req.cookies?.trusted_device;
      const isTrusted = await trustedDeviceService.isDeviceTrusted(user._id.toString(), deviceCookie);
      
      if (!isTrusted) {
         // Create a temporary JWT for MFA step
         const mfaToken = jwt.sign(
           { id: user._id.toString(), type: 'mfa' }, 
           process.env.JWT_ACCESS_SECRET || 'secret', 
           { expiresIn: '5m' }
         );
         return {
           message: 'MFA required',
           mfaRequired: true,
           mfaToken
         } as any;
      }
    }

    // 7. Generate Token Pair & Session
    const tokens = await TokenService.generateTokenPair(user._id.toString(), user.role, user.refreshTokenVersion, req);

    // 8. Audit Log Success
    await AuthRepository.createAuditLog(AuthAction.LOGIN, normalizedEmail, ipAddress, { action: 'LOGIN_SUCCESS' }, user._id);
    
    logger.info(`Successful login for user: ${user._id}`);

    // 9. Format Response
    return {
      message: 'Login successful',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        emailVerified: user.emailVerified,
        department: user.department?.toString(),
        course: user.course?.toString(),
        semester: user.semester,
        createdAt: user.createdAt
      }
    };
  }

  /**
   * Completes login by verifying MFA
   */
  static async verifyMfaLogin(mfaToken: string, code: string, req: Request, isRecovery: boolean = false): Promise<LoginResponseDTO> {
    const ipAddress = req.ip || 'unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    try {
      const decoded = jwt.verify(mfaToken, process.env.JWT_ACCESS_SECRET || 'secret') as { id: string, type: string };
      if (decoded.type !== 'mfa') throw new UnauthorizedError('Invalid MFA token type');

      const user = await AuthRepository.findUserById(decoded.id);
      if (!user) throw new UnauthorizedError('User not found');

      if (isRecovery) {
        await mfaService.recover(user._id.toString(), code);
      } else {
        await mfaService.verify(user._id.toString(), code, userAgent, ipAddress, false);
      }

      // Generate Token Pair & Session
      const tokens = await TokenService.generateTokenPair(user._id.toString(), user.role, user.refreshTokenVersion, req);
      await AuthRepository.createAuditLog(AuthAction.LOGIN, user.email, ipAddress, { action: 'MFA_LOGIN_SUCCESS' }, user._id);

      return {
        message: 'Login successful',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          accountStatus: user.accountStatus,
          emailVerified: user.emailVerified,
          department: user.department?.toString(),
          course: user.course?.toString(),
          semester: user.semester,
          createdAt: user.createdAt
        }
      };

    } catch (error: any) {
      throw new UnauthorizedError(error.message || 'Invalid or expired MFA token');
    }
  }

  /**
   * Refreshes the access token using a valid refresh token
   */
  static async refreshToken(rawRefreshToken: string, req: Request): Promise<LoginResponseDTO> {
    const ipAddress = req.ip || 'unknown';

    try {
      // 1. Verify and rotate the refresh token
      const { userId, newRefreshToken } = await RefreshTokenService.verifyAndRotateToken(rawRefreshToken, req);
      
      // 2. Fetch the user
      const user = await AuthRepository.findUserById(userId);
      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      if (user.accountStatus !== AccountStatus.ACTIVE) {
        throw new ForbiddenError('Account is not active');
      }

      // 3. Generate new Session and Access Token
      const sessionId = await SessionService.createSession(userId, req);
      const accessToken = require('./jwt.service').JwtService.generateAccessToken({
        userId,
        role: user.role,
        tokenVersion: user.refreshTokenVersion,
        sessionId
      });

      // 4. Audit Log
      await AuthRepository.createAuditLog(AuthAction.TOKEN_REFRESH, user.email, ipAddress, { action: 'TOKEN_REFRESH_SUCCESS' }, user._id);

      // 5. Format Response
      return {
        message: 'Token refreshed successfully',
        accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          accountStatus: user.accountStatus,
          emailVerified: user.emailVerified,
          department: user.department?.toString(),
          course: user.course?.toString(),
          semester: user.semester,
          createdAt: user.createdAt
        }
      };
    } catch (error: any) {
      logger.error(`Token refresh failed: ${error.message}`);
      throw error;
    }
  }
}
