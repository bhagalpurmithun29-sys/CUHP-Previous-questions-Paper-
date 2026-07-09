import mongoose, { Schema, Document } from 'mongoose';
import { PolicyType } from './legalPolicy.model';

export interface IUserConsent extends Document {
  userId?: mongoose.Types.ObjectId; // Nullable for guest cookie consent
  guestId?: string; // Fingerprint or UUID for guest cookie tracking
  consents: {
    policyType: PolicyType | 'ESSENTIAL_COOKIES' | 'ANALYTICS_COOKIES' | 'MARKETING_COOKIES';
    policyVersion?: string; // Null for cookie categories
    accepted: boolean;
    timestamp: Date;
  }[];
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserConsentSchema = new Schema<IUserConsent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    guestId: { type: String },
    consents: [{
      policyType: { type: String, required: true },
      policyVersion: { type: String },
      accepted: { type: Boolean, required: true },
      timestamp: { type: Date, default: Date.now }
    }],
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

UserConsentSchema.index({ userId: 1 });
UserConsentSchema.index({ guestId: 1 });

export const UserConsent = mongoose.model<IUserConsent>('UserConsent', UserConsentSchema);
