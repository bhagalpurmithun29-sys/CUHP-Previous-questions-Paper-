import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysisJob extends Document {
  paperId: mongoose.Types.ObjectId;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'RETRYING';
  priority: number;
  result: {
    questionCount?: number;
    metadataReference?: any;
    confidenceScore?: number;
    processingTime?: number;
  };
  errorMessage?: string;
  retryCount: number;
}

const AnalysisJobSchema = new Schema<IAnalysisJob>(
  {
    paperId: { type: Schema.Types.ObjectId, ref: 'QuestionPaper', required: true, unique: true },
    status: { type: String, enum: ['QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED', 'RETRYING'], default: 'QUEUED' },
    priority: { type: Number, default: 0 },
    result: { type: Schema.Types.Mixed },
    errorMessage: { type: String },
    retryCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const AnalysisJob = mongoose.model<IAnalysisJob>('AnalysisJob', AnalysisJobSchema);
