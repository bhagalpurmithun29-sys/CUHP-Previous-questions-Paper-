import mongoose, { Schema, Document } from 'mongoose';

export interface IPreferences extends Document {
  userId: mongoose.Types.ObjectId;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'hi';
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    largerText: boolean;
    keyboardNavigation: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    inAppNotifications: boolean;
    securityAlerts: boolean;
    academicUpdates: boolean;
    announcements: boolean;
  };
  dashboard: {
    defaultLandingPage: string;
    layoutPreferences: 'grid' | 'list';
    cardDensity: 'comfortable' | 'compact';
    visibleWidgets: string[];
  };
  downloads: {
    defaultFormat: string;
    autoOpen: boolean;
    retentionDays: number;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'connections';
    activityVisibility: boolean;
    leaderboardParticipation: boolean;
  };
  updatedAt: Date;
}

const preferencesSchema = new Schema<IPreferences>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    language: { type: String, enum: ['en', 'hi'], default: 'en' },
    accessibility: {
      reducedMotion: { type: Boolean, default: false },
      highContrast: { type: Boolean, default: false },
      largerText: { type: Boolean, default: false },
      keyboardNavigation: { type: Boolean, default: false },
    },
    notifications: {
      emailNotifications: { type: Boolean, default: true },
      inAppNotifications: { type: Boolean, default: true },
      securityAlerts: { type: Boolean, default: true },
      academicUpdates: { type: Boolean, default: true },
      announcements: { type: Boolean, default: true },
    },
    dashboard: {
      defaultLandingPage: { type: String, default: '/dashboard' },
      layoutPreferences: { type: String, enum: ['grid', 'list'], default: 'grid' },
      cardDensity: { type: String, enum: ['comfortable', 'compact'], default: 'comfortable' },
      visibleWidgets: [{ type: String }],
    },
    downloads: {
      defaultFormat: { type: String, default: 'pdf' },
      autoOpen: { type: Boolean, default: false },
      retentionDays: { type: Number, default: 30 },
    },
    privacy: {
      profileVisibility: { type: String, enum: ['public', 'private', 'connections'], default: 'private' },
      activityVisibility: { type: Boolean, default: false },
      leaderboardParticipation: { type: Boolean, default: true },
    }
  },
  { timestamps: true }
);

export const Preferences = mongoose.model<IPreferences>('Preferences', preferencesSchema);
