import mongoose, { Schema } from 'mongoose';
import { ISearchAnalytics, EntityType } from '../interfaces/search.interface';

const searchAnalyticsSchema = new Schema<ISearchAnalytics>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    query: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
    },
    entityType: {
      type: String,
      enum: Object.values(EntityType),
    },
    filters: {
      type: Schema.Types.Mixed,
    },
    resultsCount: {
      type: Number,
      required: true,
      min: 0,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

searchAnalyticsSchema.index({ query: 1 });
searchAnalyticsSchema.index({ createdAt: -1 });
searchAnalyticsSchema.index({ userId: 1 });
searchAnalyticsSchema.index({ resultsCount: 1 });

export const SearchAnalytics = mongoose.model<ISearchAnalytics>('SearchAnalytics', searchAnalyticsSchema);
