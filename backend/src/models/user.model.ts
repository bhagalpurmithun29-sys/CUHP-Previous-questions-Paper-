import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from '../interfaces/auth.interface';
import { AccountStatus, UserRole } from '../enums/auth.enum';

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
      match: [/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: { type: String, select: false, minlength: 8 },
    profileImage: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    permissions: [{ type: String }], // Optional granular permissions
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
      delete ret.__v;
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
  return \`\${this.firstName} \${this.lastName}\`;
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ department: 1, course: 1, semester: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ createdAt: -1 });

// Pre-Save Hook (Hash password)
userSchema.pre('save', async function (next) {
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
