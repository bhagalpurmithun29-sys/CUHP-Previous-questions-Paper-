import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { AccountStatus, UserRole } from '../enums/auth.enum';

export interface IUser extends Document {
  // Existing auth.interface types assuming it extends document
  [key: string]: any;
  mfaEnabled?: boolean;
  mfaSecret?: string;
  backupCodes?: string[];
  trustedDevices?: Array<{ deviceId: string; deviceName: string; lastUsed: Date }>;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: { type: String, select: false, minlength: 8 },
    profileImage: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    permissions: [{ type: String }], // Optional granular string permissions
    dynamicRoles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], // Next-gen RBAC Matrix
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    semester: { type: Number, min: 1, max: 10 },
    phoneNumber: { 
      type: String, 
      match: [/^[6-9]\\d{9}$/, 'Please fill a valid 10-digit Indian phone number'] 
    },
    emailVerified: { type: Boolean, default: false },
    accountStatus: { type: String, enum: Object.values(AccountStatus), default: AccountStatus.PENDING_VERIFICATION },
    lastLogin: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    passwordChangedAt: { type: Date },
    refreshTokenVersion: { type: Number, default: 0 }, // For bulk revoking tokens
    authProviders: [{ 
      provider: { type: String, required: true },
      providerId: { type: String, required: true }
    }],
    
    // MFA
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, select: false },
    backupCodes: [{ type: String, select: false }], // Hashed strings
    trustedDevices: [{ 
      deviceId: { type: String }, 
      deviceName: { type: String }, 
      lastUsed: { type: Date }
    }],
    
    // Gamification & Community
    contributionScore: { type: Number, default: 0 },
    badges: [{ type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Legend'] }],
    achievements: [{ type: String }],
    
    // Audit & Soft Delete
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true, transform: (doc, ret) => {
      delete ret.password;
      delete (ret as any).__v;
      delete ret.failedLoginAttempts;
      delete ret.lockUntil;
      delete ret.refreshTokenVersion;
      return ret;
    } },
    toObject: { virtuals: true }
  }
);

// Virtuals
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });
userSchema.index({ department: 1, course: 1, semester: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ contributionScore: -1 }); // Fast leaderboard querying
userSchema.index({ role: 1 }, { unique: true, partialFilterExpression: { role: 'ADMIN' } }); // Enforce SINGLE ADMIN

// Pre-Save Hook (Admin Uniqueness & Hash password)
userSchema.pre('save', async function (next) {
  // Ensure only one ADMIN exists
  if (this.isModified('role') || this.isNew) {
    if (this.role === UserRole.ADMIN) {
      const existingAdmin = await (this.constructor as mongoose.Model<IUser>).findOne({ 
        role: UserRole.ADMIN, 
        _id: { $ne: this._id } 
      });
      if (existingAdmin) {
        return next(new Error('SYSTEM_RULE: Only one ADMIN is allowed in the entire system.'));
      }
    }
  }

  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password as string, salt);
    this.passwordChangedAt = new Date();
    next();
  } catch (error: any) {
    next(error);
  }
});

// Instance Methods
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
};

userSchema.methods.incrementLoginAttempts = async function (): Promise<void> {
  // Lock account for 30 minutes if failed attempts hit 5
  if (this.lockUntil && this.lockUntil.getTime() < Date.now()) {
    this.failedLoginAttempts = 1;
    this.lockUntil = undefined;
  } else {
    this.failedLoginAttempts += 1;
    if (this.failedLoginAttempts >= 5) {
      this.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
    }
  }
  await this.save({ validateBeforeSave: false });
};

userSchema.methods.resetLoginAttempts = async function (): Promise<void> {
  this.failedLoginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = new Date();
  await this.save({ validateBeforeSave: false });
};

// Static Methods
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email, isDeleted: false });
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
