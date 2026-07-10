import mongoose, { Schema, Document } from 'mongoose';

export interface IReprocessingJob extends Document {
  targetId: mongoose.Types.ObjectId;
  targetType: 'PAPER' | 'COURSE' | 'DEPARTMENT' | 'REPOSITORY';
  triggerReason: string;
  triggeredBy: mongoose.Types.ObjectId;
  modules: string[];
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'PARTIAL_RETRY';
  duration?: number;
  result?: any;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReprocessingJobSchema = new Schema({
  targetId: { type: Schema.Types.ObjectId, required: true },
  targetType: { type: String, enum: ['PAPER', 'COURSE', 'DEPARTMENT', 'REPOSITORY'], required: true },
  triggerReason: { type: String, required: true },
  triggeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [{ type: String }],
  status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'PARTIAL_RETRY'], default: 'PENDING' },
  duration: { type: Number },
  result: { type: Schema.Types.Mixed },
  error: { type: String }
}, { timestamps: true });

export const ReprocessingJob = mongoose.model<IReprocessingJob>('ReprocessingJob', ReprocessingJobSchema);
