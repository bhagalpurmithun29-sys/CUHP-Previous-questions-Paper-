import mongoose, { Schema, Document } from 'mongoose';

export enum PolicyType {
  TERMS_OF_SERVICE = 'Terms of Service',
  PRIVACY_POLICY = 'Privacy Policy',
  COMMUNITY_GUIDELINES = 'Community Guidelines',
  ACCEPTABLE_USE = 'Acceptable Use Policy',
  COPYRIGHT = 'Copyright Policy',
  CONTENT_REMOVAL = 'Content Removal Policy',
  DISCLAIMER = 'Disclaimer',
  COOKIE_POLICY = 'Cookie Policy',
  DATA_RETENTION = 'Data Retention Policy',
  ACCESSIBILITY = 'Accessibility Statement',
}

export interface ILegalPolicy extends Document {
  title: string;
  slug: string;
  type: PolicyType;
  content: string; // HTML or Markdown
  version: string;
  isPublished: boolean;
  publishedAt?: Date;
  summary: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LegalPolicySchema = new Schema<ILegalPolicy>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: Object.values(PolicyType), required: true },
    content: { type: String, required: true },
    version: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    summary: { type: String, required: true, maxlength: 500 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Keep older versions but query the latest published one
LegalPolicySchema.index({ type: 1, isPublished: 1, publishedAt: -1 });

export const LegalPolicy = mongoose.model<ILegalPolicy>('LegalPolicy', LegalPolicySchema);
