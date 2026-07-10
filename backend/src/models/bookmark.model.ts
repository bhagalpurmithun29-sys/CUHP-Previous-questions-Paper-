import mongoose, { Schema } from 'mongoose';
import { IBookmark } from '../interfaces/models.interface';

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    type: { type: String, enum: ['PAPER', 'PAGE', 'SECTION', 'SEARCH_RESULT'], default: 'PAPER' },
    pageNumber: { type: Number },
    sectionId: { type: String },
    note: { type: String, maxlength: 1000 },
    tags: [{ type: String, trim: true }],
    isFavorite: { type: Boolean, default: false },
    colorLabel: { type: String },
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

bookmarkSchema.index({ userId: 1, paperId: 1, type: 1, pageNumber: 1, sectionId: 1 }, { unique: true });
bookmarkSchema.index({ paperId: 1 });
bookmarkSchema.index({ userId: 1, isFavorite: -1 });
bookmarkSchema.index({ tags: 1 });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
