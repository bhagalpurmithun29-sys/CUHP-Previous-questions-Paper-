import mongoose, { Schema } from 'mongoose';
import { ILibraryItem, LibraryItemType } from '../interfaces/library.interface';

const libraryItemSchema = new Schema<ILibraryItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    type: { type: String, enum: Object.values(LibraryItemType), required: true },
    
    lastPage: { type: Number },
    timeSpent: { type: Number },
    deviceInfo: { type: String }
  },
  { timestamps: true }
);

// High performance compound indexes for fast library dashboard loads
libraryItemSchema.index({ userId: 1, type: 1, createdAt: -1 });
libraryItemSchema.index({ userId: 1, paperId: 1, type: 1 }, { unique: true });

export const LibraryItem = mongoose.model<ILibraryItem>('LibraryItem', libraryItemSchema);
