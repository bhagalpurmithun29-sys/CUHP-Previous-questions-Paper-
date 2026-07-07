import mongoose, { ClientSession } from 'mongoose';
import { User } from '../../../models/user.model';
import { PasswordResetToken, IPasswordResetToken } from '../../../models/passwordResetToken.model';
import { LoginSession } from '../../../models/loginSession.model';
import { IUser } from '../../../interfaces/auth.interface';

export class PasswordResetRepository {
  /**
   * Finds a user by email, strictly excluding deleted accounts
   */
  static async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase(), isDeleted: false });
  }

  /**
   * Invalidates all existing password reset tokens for a user
   */
  static async invalidatePreviousTokens(userId: mongoose.Types.ObjectId, session?: ClientSession): Promise<void> {
    await PasswordResetToken.deleteMany({ userId }).session(session || null);
  }

  /**
   * Saves a new password reset token
   */
  static async saveResetToken(userId: mongoose.Types.ObjectId, hashedToken: string, expiresAt: Date, session?: ClientSession): Promise<IPasswordResetToken> {
    const token = new PasswordResetToken({
      userId,
      hashedToken,
      expiresAt
    });
    return token.save({ session });
  }

  /**
   * Finds an active reset token by its hashed value
   */
  static async findResetToken(hashedToken: string): Promise<IPasswordResetToken | null> {
    return PasswordResetToken.findOne({ hashedToken, used: false });
  }

  /**
   * Finds a user by ID
   */
  static async findUserById(userId: mongoose.Types.ObjectId, session?: ClientSession): Promise<IUser | null> {
    return User.findById(userId).session(session || null);
  }

  /**
   * Updates user password, increments token version, marks token as used, and invalidates sessions
   */
  static async executePasswordReset(
    userId: mongoose.Types.ObjectId,
    tokenId: mongoose.Types.ObjectId,
    newPasswordHash: string,
    session: ClientSession
  ): Promise<void> {
    // 1. Update User Password and Metadata
    await User.updateOne(
      { _id: userId },
      { 
        $set: { 
          password: newPasswordHash,
          passwordChangedAt: new Date()
        },
        $inc: { refreshTokenVersion: 1 } // Instantly invalidates all existing refresh tokens
      },
      { session }
    );

    // 2. Mark Reset Token as Used
    await PasswordResetToken.updateOne(
      { _id: tokenId },
      { 
        $set: { 
          used: true, 
          usedAt: new Date() 
        } 
      },
      { session }
    );

    // 3. Delete all active Login Sessions for this user
    await LoginSession.updateMany(
      { userId, isActive: true },
      { $set: { isActive: false } },
      { session }
    );
  }
}
