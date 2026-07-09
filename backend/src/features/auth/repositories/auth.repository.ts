import { User } from '../../../models/user.model';
import { EmailVerificationToken } from '../../../models/emailVerificationToken.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { IUser, IEmailVerificationToken } from '../../../interfaces/auth.interface';
import { AuthAction } from '../../../enums/auth.enum';
import { RegisterRequestDTO } from '../dtos/register.dto';
import mongoose, { ClientSession } from 'mongoose';

export class AuthRepository {
  /**
   * Finds a user by their email address (case-insensitive)
   */
  static async findUserByEmail(email: string, session?: ClientSession): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase(), isDeleted: false }).session(session || null) as any;
  }

  /**
   * Finds a user by ID
   */
  static async findUserById(id: string | mongoose.Types.ObjectId): Promise<IUser | null> {
    return User.findById(id).select('+password') as any; // Sometimes we need the password, but we can just use normal findById
  }

  /**
   * Finds a user by email and explicitly selects the password field for verification
   */
  static async findUserByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email: email.toLowerCase(), isDeleted: false }).select('+password') as any;
  }

  /**
   * Creates a new user in the database
   */
  static async createUser(userData: RegisterRequestDTO, session: ClientSession): Promise<IUser> {
    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      department: userData.department,
      course: userData.course,
      semester: userData.semester,
    });
    return user.save({ session }) as any;
  }

  /**
   * Saves an email verification token
   */
  static async saveVerificationToken(userId: mongoose.Types.ObjectId, hashedToken: string, expiresAt: Date, session: ClientSession): Promise<IEmailVerificationToken> {
    const token = new EmailVerificationToken({
      userId,
      hashedToken,
      expiresAt
    });
    return token.save({ session });
  }

  /**
   * Creates an audit log entry for authentication events
   */
  static async createAuditLog(
    action: AuthAction,
    emailAttempted: string,
    ipAddress?: string,
    metadata?: any,
    userId?: mongoose.Types.ObjectId,
    session?: ClientSession
  ): Promise<void> {
    const log = new AuthAuditLog({
      action,
      emailAttempted,
      ipAddress,
      metadata,
      userId
    });
    
    if (session) {
      await log.save({ session });
    } else {
      await log.save();
    }
  }
}
