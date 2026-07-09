import mongoose, { Schema } from 'mongoose';
import { ISavedSearch } from '../interfaces/search.interface';

const savedSearchSchema = new Schema<ISavedSearch>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    query: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    filters: {
      type: Schema.Types.Mixed,
      default: {},
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    lastSearchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

savedSearchSchema.index({ userId: 1, lastSearchedAt: -1 });
savedSearchSchema.index({ userId: 1, isPinned: -1 });

// Ensure unique query + filters combination per user
savedSearchSchema.index({ userId: 1, query: 1 }, { unique: false }); // Optional uniqueness

export const SavedSearch = mongoose.model<ISavedSearch>('SavedSearch', savedSearchSchema);
