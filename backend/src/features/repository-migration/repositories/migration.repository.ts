import mongoose, { Document, Schema } from 'mongoose';

export interface IMigrationJob extends Document {
  type: 'IMPORT' | 'EXPORT' | 'MIGRATION' | 'BACKUP' | 'RESTORE' | 'SYNC';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'DRY_RUN';
  initiatedBy: mongoose.Types.ObjectId;
  details: any;
  report: any;
  errorMessage?: string;
}

const MigrationJobSchema = new Schema<IMigrationJob>(
  {
    type: { type: String, enum: ['IMPORT', 'EXPORT', 'MIGRATION', 'BACKUP', 'RESTORE', 'SYNC'], required: true },
    status: { type: String, enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'DRY_RUN'], default: 'PENDING' },
    initiatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    details: { type: Schema.Types.Mixed },
    report: { type: Schema.Types.Mixed },
    errorMessage: { type: String }
  },
  { timestamps: true }
);

export const MigrationJob = mongoose.model<IMigrationJob>('MigrationJob', MigrationJobSchema);

export class MigrationRepository {
  async createJob(data: Partial<IMigrationJob>) {
    return MigrationJob.create(data);
  }

  async getJobs(page: number = 1, limit: number = 10) {
    return MigrationJob.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('initiatedBy', 'name email');
  }

  async getJobById(id: string) {
    return MigrationJob.findById(id);
  }
}
