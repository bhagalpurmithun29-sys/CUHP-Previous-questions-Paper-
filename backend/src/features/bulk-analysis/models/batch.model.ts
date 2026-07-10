import mongoose, { Schema, Document } from 'mongoose';

export interface IBatchJob extends Document {
  name: string;
  scopeType: 'SINGLE' | 'SELECTED' | 'SUBJECT' | 'COURSE' | 'DEPARTMENT' | 'ALL';
  scopeIds: mongoose.Types.ObjectId[];
  jobType: 'INITIAL' | 'INCREMENTAL' | 'RE_ANALYSIS' | 'SCHEDULED';
  modules: string[];
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PARTIAL' | 'CANCELLED';
  createdBy: mongoose.Types.ObjectId;
  stats: {
    total: number;
    completed: number;
    failed: number;
    skipped: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BatchJobSchema = new Schema({
  name: { type: String, required: true },
  scopeType: { type: String, enum: ['SINGLE', 'SELECTED', 'SUBJECT', 'COURSE', 'DEPARTMENT', 'ALL'], required: true },
  scopeIds: [{ type: Schema.Types.ObjectId }],
  jobType: { type: String, enum: ['INITIAL', 'INCREMENTAL', 'RE_ANALYSIS', 'SCHEDULED'], required: true },
  modules: [{ type: String }],
  status: { type: String, enum: ['QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIAL', 'CANCELLED'], default: 'QUEUED' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  stats: {
    total: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 }
  }
}, { timestamps: true });

export const BatchJob = mongoose.model<IBatchJob>('BatchJob', BatchJobSchema);
