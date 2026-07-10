import mongoose, { Schema } from 'mongoose';
import { IReadingList } from '../interfaces/models.interface';

const readingListSchema = new Schema<IReadingList>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    isFavorite: { type: Boolean, default: false },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Bookmark' }],
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

readingListSchema.index({ userId: 1, name: 1 }, { unique: true, partialFilterExpression: { isDeleted: false } });

export const ReadingList = mongoose.model<IReadingList>('ReadingList', readingListSchema);
