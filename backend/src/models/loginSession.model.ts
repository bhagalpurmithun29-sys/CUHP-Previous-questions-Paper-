import mongoose, { Schema } from 'mongoose';
import { ILoginSession } from '../interfaces/auth.interface';

const loginSessionSchema = new Schema<ILoginSession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    device: { type: String },
    browser: { type: String },
    platform: { type: String },
    ip: { type: String },
    country: { type: String },
    city: { type: String },
    lastActivity: { type: Date, default: Date.now },
    loginAt: { type: Date, default: Date.now },
    logoutAt: { type: Date },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

loginSessionSchema.index({ userId: 1, active: 1 });
loginSessionSchema.index({ lastActivity: -1 });

export const LoginSession = mongoose.model<ILoginSession>('LoginSession', loginSessionSchema);
