import mongoose, { Schema } from 'mongoose';
import { IEmailVerificationToken } from '../interfaces/auth.interface';

const emailVerificationTokenSchema = new Schema<IEmailVerificationToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hashedToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
    usedAt: { type: Date },
  },
  { timestamps: true }
);

emailVerificationTokenSchema.index({ userId: 1 });
emailVerificationTokenSchema.index({ hashedToken: 1 });
// TTL Index (Auto-delete after 24 hours of expiration to keep DB clean)
emailVerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

export const EmailVerificationToken = mongoose.model<IEmailVerificationToken>('EmailVerificationToken', emailVerificationTokenSchema);
