import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from '../interfaces/auth.interface';

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hashedToken: { type: String, required: true },
    deviceName: { type: String },
    browser: { type: String },
    operatingSystem: { type: String },
    ipAddress: { type: String },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    revokedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ hashedToken: 1 });
// TTL Index to automatically delete expired tokens from the DB
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);
