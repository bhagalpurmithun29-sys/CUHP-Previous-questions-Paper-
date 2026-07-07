import mongoose, { Schema } from 'mongoose';
import { IDownload } from '../interfaces/models.interface';

const downloadSchema = new Schema<IDownload>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Null if anonymous
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true },
    downloadDate: { type: Date, default: Date.now },
    ipAddress: { type: String },
    device: { type: String },
    
    // Audit & Soft Delete
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes for analytics
downloadSchema.index({ paperId: 1, downloadDate: -1 });
downloadSchema.index({ userId: 1, downloadDate: -1 });

export const Download = mongoose.model<IDownload>('Download', downloadSchema);
