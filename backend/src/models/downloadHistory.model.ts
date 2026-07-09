import mongoose, { Schema } from 'mongoose';
import { IDownloadHistory, DownloadStatus } from '../interfaces/download.interface';

const downloadHistorySchema = new Schema<IDownloadHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, index: true },
    
    status: { type: String, enum: Object.values(DownloadStatus), default: DownloadStatus.INITIATED },
    
    ipAddress: { type: String },
    userAgent: { type: String },
    browser: { type: String },
    os: { type: String },
    countryPlaceholder: { type: String },
    
    expiresAt: { type: Date },
    downloadUrl: { type: String }
  },
  { timestamps: true }
);

// High-performance analytics indexes
downloadHistorySchema.index({ createdAt: -1 });
downloadHistorySchema.index({ paperId: 1, createdAt: -1 });
downloadHistorySchema.index({ userId: 1, createdAt: -1 });

export const DownloadHistory = mongoose.model<IDownloadHistory>('DownloadHistory', downloadHistorySchema);
