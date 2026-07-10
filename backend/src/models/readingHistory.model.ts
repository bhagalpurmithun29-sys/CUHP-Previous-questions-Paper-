import mongoose, { Schema, Document } from 'mongoose';

export interface IReadingHistory extends Document {
  userId: mongoose.Types.ObjectId;
  paperId: mongoose.Types.ObjectId;
  lastPageRead: number;
  progressPercentage: number;
  totalTimeSpent: number; // in seconds
  lastReadAt: Date;
  bookmarks: number[]; // array of page numbers
  createdAt: Date;
  updatedAt: Date;
}

const readingHistorySchema = new Schema<IReadingHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'Paper', required: true, index: true },
    lastPageRead: { type: Number, default: 1 },
    progressPercentage: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 },
    lastReadAt: { type: Date, default: Date.now },
    bookmarks: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

// Compound index for unique tracking per user per paper
readingHistorySchema.index({ userId: 1, paperId: 1 }, { unique: true });

export const ReadingHistory = mongoose.model<IReadingHistory>('ReadingHistory', readingHistorySchema);
