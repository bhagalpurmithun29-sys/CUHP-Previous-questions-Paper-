import { Document, Types, Model } from 'mongoose';
import { AccountStatus, UserRole, AuthAction } from '../enums/auth.enum';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  fullName: string; // virtual
  email: string;
  password?: string;
  profileImage?: string;
  role: UserRole;
  permissions: string[];
  department?: Types.ObjectId;
  course?: Types.ObjectId;
  semester?: number;
  phoneNumber?: string;
  emailVerified: boolean;
  accountStatus: AccountStatus;
  lastLogin?: Date;
  failedLoginAttempts: number;
  lockUntil?: Date;
  passwordChangedAt?: Date;
  refreshTokenVersion: number;
  authProviders?: Array<{ provider: string; providerId: string }>;
  mfaEnabled?: boolean;
  mfaSecret?: string;
  backupCodes?: string[];
  trustedDevices?: Array<{ deviceId: string; deviceName: string; lastUsed: Date }>;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  matchPassword(enteredPassword: string): Promise<boolean>;
  isLocked(): boolean;
  incrementLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
}

export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

export interface IRefreshToken extends Document {
  userId: Types.ObjectId;
  hashedToken: string;
  deviceName?: string;
  browser?: string;
  operatingSystem?: string;
  ipAddress?: string;
  expiresAt: Date;
  revoked: boolean;
  revokedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmailVerificationToken extends Document {
  userId: Types.ObjectId;
  hashedToken: string;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPasswordResetToken extends Document {
  userId: Types.ObjectId;
  hashedToken: string;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginSession extends Document {
  userId: Types.ObjectId;
  device?: string;
  browser?: string;
  platform?: string;
  ip?: string;
  country?: string;
  city?: string;
  lastActivity: Date;
  loginAt: Date;
  logoutAt?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthAuditLog extends Document {
  userId?: Types.ObjectId;
  emailAttempted?: string;
  action: AuthAction;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}
