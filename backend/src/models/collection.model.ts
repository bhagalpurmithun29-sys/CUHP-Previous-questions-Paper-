import mongoose, { Schema } from 'mongoose';
import { ICollection } from '../interfaces/library.interface';

const collectionSchema = new Schema<ICollection>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    isPinned: { type: Boolean, default: false },
    
    paperIds: [{ type: Schema.Types.ObjectId, ref: 'QuestionPaper' }],
    paperCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Indexes
collectionSchema.index({ userId: 1, isPinned: -1, updatedAt: -1 });
collectionSchema.index({ userId: 1, name: 1 }, { unique: true });

// Pre-save hook to maintain count
collectionSchema.pre('save', function(next) {
  if (this.isModified('paperIds')) {
    this.paperCount = this.paperIds.length;
  }
  next();
});

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);
