import mongoose, { Schema, Document } from 'mongoose';

export interface IAdoption extends Document {
  userId: mongoose.Types.ObjectId;
  tours: Record<string, boolean>; // e.g., { 'dashboardTour': true }
  hintsDismissed: string[];
  milestones: Record<string, Date>; // e.g., { 'firstLogin': '2026-07-09T00:00:00.000Z' }
  preferences: {
    toursEnabled: boolean;
    hintsEnabled: boolean;
  };
}

const adoptionSchema = new Schema<IAdoption>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    tours: { type: Map, of: Boolean, default: {} },
    hintsDismissed: [{ type: String }],
    milestones: { type: Map, of: Date, default: {} },
    preferences: {
      toursEnabled: { type: Boolean, default: true },
      hintsEnabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const Adoption = mongoose.model<IAdoption>('Adoption', adoptionSchema);
