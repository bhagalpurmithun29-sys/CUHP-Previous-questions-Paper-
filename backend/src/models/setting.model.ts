import mongoose, { Schema, Document } from 'mongoose';

export enum SettingCategory {
  GENERAL = 'GENERAL',
  ACADEMIC = 'ACADEMIC',
  UPLOADS = 'UPLOADS',
  DOWNLOADS = 'DOWNLOADS',
  STORAGE = 'STORAGE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  AUTHENTICATION = 'AUTHENTICATION',
  SECURITY = 'SECURITY',
  ANALYTICS = 'ANALYTICS',
  BRANDING = 'BRANDING',
  MAINTENANCE = 'MAINTENANCE',
  FEATURE_FLAGS = 'FEATURE_FLAGS'
}

export interface ISetting extends Document {
  key: string;
  value: any;
  category: SettingCategory;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  isPublic: boolean; // If true, can be fetched without auth (e.g. branding, maintenance status)
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const settingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
    category: { type: String, enum: Object.values(SettingCategory), required: true, index: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['string', 'number', 'boolean', 'json'], required: true },
    isPublic: { type: Boolean, default: false },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Setting = mongoose.model<ISetting>('Setting', settingSchema);
