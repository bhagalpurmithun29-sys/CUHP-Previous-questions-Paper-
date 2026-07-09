import mongoose, { ClientSession } from 'mongoose';
import { User } from '../../../models/user.model';
import { EmailVerificationToken } from '../../../models/emailVerificationToken.model';
import { IEmailVerificationToken, IUser } from '../../../interfaces/auth.interface';
import { AccountStatus } from '../../../enums/auth.enum';

export class EmailVerificationRepository {
  /**
   * Finds an active verification token by its hashed value
   */
  static async findVerificationToken(hashedToken: string): Promise<IEmailVerificationToken | null> {
    return EmailVerificationToken.findOne({ hashedToken, used: false });
  }

  /**
   * Finds a user by ID
   */
  static async findUserById(userId: mongoose.Types.ObjectId, session?: ClientSession): Promise<IUser | null> {
    return User.findById(userId).session(session || null) as any;
  }

  /**
   * Finds a user by email
   */
  static async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase(), isDeleted: false }) as any;
  }

  /**
   * Deletes all existing verification tokens for a specific user
   * Used before generating a new token during a "resend" flow
   */
  static async invalidatePreviousTokens(userId: mongoose.Types.ObjectId, session?: ClientSession): Promise<void> {
    await EmailVerificationToken.deleteMany({ userId }).session(session || null);
  }

  /**
   * Updates user status to verified and marks token as used inside a transaction
   */
  static async verifyUserAndInvalidateToken(
    userId: mongoose.Types.ObjectId,
    tokenId: mongoose.Types.ObjectId,
    session: ClientSession
  ): Promise<void> {
    // Update User
    await User.updateOne(
      { _id: userId },
      { 
        $set: { 
          emailVerified: true, 
          accountStatus: AccountStatus.ACTIVE 
        } 
      },
      { session }
    );

    // Mark token as used instead of deleting, for audit purposes
    await EmailVerificationToken.updateOne(
      { _id: tokenId },
      { 
        $set: { 
          used: true, 
          usedAt: new Date() 
        } 
      },
      { session }
    );
  }
}
