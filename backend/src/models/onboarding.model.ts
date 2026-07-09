import mongoose, { Schema, Document } from 'mongoose';

export interface IOnboarding extends Document {
  userId: mongoose.Types.ObjectId;
  isCompleted: boolean;
  completedAt?: Date;
  currentStep: number;
  skippedSteps: number[];
  progress: {
    hasProfile: boolean;
    hasAcademic: boolean;
    hasPreferences: boolean;
    hasAvatar: boolean;
  };
  analytics: {
    startTime: Date;
    endTime?: Date;
    featureTourCompleted: boolean;
  };
}

const onboardingSchema = new Schema<IOnboarding>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    currentStep: { type: Number, default: 0 },
    skippedSteps: [{ type: Number }],
    progress: {
      hasProfile: { type: Boolean, default: false },
      hasAcademic: { type: Boolean, default: false },
      hasPreferences: { type: Boolean, default: false },
      hasAvatar: { type: Boolean, default: false },
    },
    analytics: {
      startTime: { type: Date, default: Date.now },
      endTime: { type: Date },
      featureTourCompleted: { type: Boolean, default: false },
    }
  },
  { timestamps: true }
);

export const Onboarding = mongoose.model<IOnboarding>('Onboarding', onboardingSchema);
