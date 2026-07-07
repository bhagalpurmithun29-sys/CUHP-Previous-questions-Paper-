import mongoose, { Schema } from 'mongoose';
import { IBookmark } from '../interfaces/models.interface';

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Compound Index to prevent duplicate bookmarks for the same user and paper
bookmarkSchema.index({ userId: 1, paperId: 1 }, { unique: true });
bookmarkSchema.index({ paperId: 1 });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
