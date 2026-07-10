import mongoose, { Document, Schema } from 'mongoose';

export interface IExtractionJob extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  priority: number;
  extractedQuestions: any[];
  overallConfidence: number;
  processingTime: number;
  reviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  errorMessage?: string;
  retryCount: number;
}

const ExtractionJobSchema = new Schema<IExtractionJob>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    priority: { type: Number, default: 0 },
    extractedQuestions: { type: [Schema.Types.Mixed], default: [] },
    overallConfidence: { type: Number, default: 0 },
    processingTime: { type: Number, default: 0 },
    reviewStatus: { type: String, enum: ['PENDING_REVIEW', 'APPROVED', 'REJECTED'], default: 'PENDING_REVIEW' },
    errorMessage: { type: String },
    retryCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const ExtractionJob = mongoose.model<IExtractionJob>('ExtractionJob', ExtractionJobSchema);
