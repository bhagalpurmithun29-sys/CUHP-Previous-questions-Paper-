import mongoose from 'mongoose';
import { EmailVerificationRepository } from '../repositories/email-verification.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { VerifyEmailResponseDTO, ResendVerificationRequestDTO } from '../dtos/verify-email.dto';
import { BadRequestError, NotFoundError } from '../../../utils/ApiError';
import { TokenUtil } from '../utils/token.util';
import { AuthAction, AccountStatus } from '../../../enums/auth.enum';
import { logger } from '../../../utils/logger';

export class EmailVerificationService {
  /**
   * Validates the token, checks expiration, and activates the user account
   */
  static async verifyEmail(rawToken: string, ipAddress: string): Promise<VerifyEmailResponseDTO> {
    const hashedToken = TokenUtil.hashToken(rawToken);

    // 1. Find the token
    const tokenDoc = await EmailVerificationRepository.findVerificationToken(hashedToken);
    
    if (!tokenDoc) {
      throw new BadRequestError('Invalid or already used verification token');
    }

    // 2. Check Expiration
    if (tokenDoc.expiresAt.getTime() < Date.now()) {
      throw new BadRequestError('Verification token has expired. Please request a new one.');
    }

    // 3. Find User
    const user = await EmailVerificationRepository.findUserById(tokenDoc.userId);
    if (!user) {
      throw new NotFoundError('User associated with this token not found');
    }

    if (user.emailVerified) {
      throw new BadRequestError('Account is already verified');
    }

    // 4. Start Transaction to verify user and invalidate token
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await EmailVerificationRepository.verifyUserAndInvalidateToken(user._id, tokenDoc._id, session);
      
      // Audit log
      await AuthRepository.createAuditLog(
        AuthAction.EMAIL_VERIFICATION,
        user.email,
        ipAddress,
        { action: 'EMAIL_VERIFIED_SUCCESS' },
        user._id,
        session
      );

      await session.commitTransaction();
      logger.info(`User ${user._id} successfully verified email`);

      return {
        success: true,
        message: 'Your email has been successfully verified. You can now log in.'
      };

    } catch (error) {
      await session.abortTransaction();
      logger.error(`Failed to verify email for user ${user._id}: `, error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Invalidates old tokens, generates a new one, and simulates sending an email
   */
  static async resendVerification(dto: ResendVerificationRequestDTO, ipAddress: string): Promise<VerifyEmailResponseDTO> {
    const normalizedEmail = dto.email.toLowerCase().trim();
    
    // 1. Find User
    const user = await EmailVerificationRepository.findUserByEmail(normalizedEmail);
    if (!user) {
      // Vague error to prevent email enumeration
      return { success: true, message: 'If an account exists, a verification email has been sent.' };
    }

    // 2. Check Status
    if (user.emailVerified || user.accountStatus === AccountStatus.ACTIVE) {
      throw new BadRequestError('This account is already verified. Please log in.');
    }
    if (user.accountStatus === AccountStatus.SUSPENDED || user.accountStatus === AccountStatus.BLOCKED) {
      throw new BadRequestError('Cannot send verification email to a suspended or blocked account.');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 3. Invalidate previous tokens
      await EmailVerificationRepository.invalidatePreviousTokens(user._id, session);

      // 4. Generate new token
      const rawToken = TokenUtil.generateSecureToken();
      const hashedToken = TokenUtil.hashToken(rawToken);
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiry

      // 5. Save new token
      await AuthRepository.saveVerificationToken(user._id, hashedToken, expiresAt, session);

      // 6. Audit Log
      await AuthRepository.createAuditLog(
        AuthAction.EMAIL_VERIFICATION,
        normalizedEmail,
        ipAddress,
        { action: 'VERIFICATION_RESENT' },
        user._id,
        session
      );

      await session.commitTransaction();

      // 7. Simulate Email Service (Placeholder)
      const verificationUrl = `/verify-email?token=${rawToken}`;
      logger.info(`Verification email RESENT for ${normalizedEmail}. URL placeholder: ${verificationUrl}`);

      return {
        success: true,
        message: 'If an account exists, a verification email has been sent.'
      };

    } catch (error) {
      await session.abortTransaction();
      logger.error(`Failed to resend verification for ${normalizedEmail}: `, error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
