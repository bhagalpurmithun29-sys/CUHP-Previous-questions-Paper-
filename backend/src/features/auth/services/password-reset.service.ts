import mongoose from 'mongoose';
import { PasswordResetRepository } from '../repositories/password-reset.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { ForgotPasswordRequestDTO, ForgotPasswordResponseDTO, ResetPasswordRequestDTO, ResetPasswordResponseDTO } from '../dtos/password-reset.dto';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../../utils/ApiError';
import { TokenUtil } from '../utils/token.util';
import { AuthAction, AccountStatus } from '../../../enums/auth.enum';
import { logger } from '../../../utils/logger';
import { PasswordService } from './password.service'; // Assuming previously created
import bcrypt from 'bcryptjs';
import config from '../../../config';

export class PasswordResetService {
  /**
   * Initiates the password reset flow.
   * ALWAYS returns success, even if user doesn't exist (Email Enumeration protection)
   */
  static async requestPasswordReset(dto: ForgotPasswordRequestDTO, ipAddress: string): Promise<ForgotPasswordResponseDTO> {
    const normalizedEmail = dto.email.toLowerCase().trim();
    logger.info(\`Password reset requested for: \${normalizedEmail}\`);

    const user = await PasswordResetRepository.findUserByEmail(normalizedEmail);
    
    // Fake success to prevent attackers from guessing valid emails
    if (!user) {
      return { success: true, message: 'If an account exists, a password reset email has been sent.' };
    }

    if (user.accountStatus === AccountStatus.SUSPENDED || user.accountStatus === AccountStatus.BLOCKED || user.accountStatus === AccountStatus.DELETED) {
      logger.warn(\`Password reset attempted on non-active account: \${normalizedEmail}\`);
      return { success: true, message: 'If an account exists, a password reset email has been sent.' };
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Invalidate previous tokens
      await PasswordResetRepository.invalidatePreviousTokens(user._id, session);

      // 2. Generate cryptographically secure token
      const rawToken = TokenUtil.generateSecureToken();
      const hashedToken = TokenUtil.hashToken(rawToken);
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 30); // 30 minutes expiry

      // 3. Save Token
      await PasswordResetRepository.saveResetToken(user._id, hashedToken, expiresAt, session);

      // 4. Audit Log
      await AuthRepository.createAuditLog(
        AuthAction.PASSWORD_RESET,
        normalizedEmail,
        ipAddress,
        { action: 'PASSWORD_RESET_REQUESTED' },
        user._id,
        session
      );

      await session.commitTransaction();

      // 5. Send Email (Placeholder)
      const resetUrl = \`/reset-password?token=\${rawToken}\`;
      logger.info(\`Password reset email sent for \${normalizedEmail}. URL placeholder: \${resetUrl}\`);

      return {
        success: true,
        message: 'If an account exists, a password reset email has been sent.'
      };

    } catch (error) {
      await session.abortTransaction();
      logger.error(\`Failed to process forgot password for \${normalizedEmail}: \`, error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Executes the password reset
   */
  static async executePasswordReset(dto: ResetPasswordRequestDTO, ipAddress: string): Promise<ResetPasswordResponseDTO> {
    const hashedToken = TokenUtil.hashToken(dto.token);

    // 1. Verify Token
    const tokenDoc = await PasswordResetRepository.findResetToken(hashedToken);
    if (!tokenDoc) {
      throw new BadRequestError('Invalid or already used reset token');
    }

    // 2. Check Expiration
    if (tokenDoc.expiresAt.getTime() < Date.now()) {
      throw new BadRequestError('Reset token has expired. Please request a new one.');
    }

    // 3. Find User
    const user = await PasswordResetRepository.findUserById(tokenDoc.userId);
    if (!user) {
      throw new NotFoundError('User associated with this token not found');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 4. Hash the new password using bcrypt
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
      const newPasswordHash = await bcrypt.hash(dto.password, saltRounds);

      // 5. Execute DB updates (Password, Token Version, Session Invalidation)
      await PasswordResetRepository.executePasswordReset(user._id, tokenDoc._id, newPasswordHash, session);

      // 6. Audit Log
      await AuthRepository.createAuditLog(
        AuthAction.PASSWORD_RESET,
        user.email,
        ipAddress,
        { action: 'PASSWORD_RESET_COMPLETED' },
        user._id,
        session
      );

      await session.commitTransaction();
      logger.info(\`User \${user._id} successfully reset their password. All existing sessions invalidated.\`);

      // 7. Send Password Changed Confirmation Email (Placeholder)
      logger.info(\`Password change confirmation email sent to \${user.email}\`);

      return {
        success: true,
        message: 'Your password has been successfully reset. You will need to log in again on all your devices.'
      };

    } catch (error) {
      await session.abortTransaction();
      logger.error(\`Failed to execute password reset for user \${user._id}: \`, error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
