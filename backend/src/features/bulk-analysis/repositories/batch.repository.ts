import { BatchJob, IBatchJob } from '../models/batch.model';

export class BatchRepository {
  async createJob(data: Partial<IBatchJob>): Promise<IBatchJob> {
    return BatchJob.create(data);
  }

  async getHistory(): Promise<IBatchJob[]> {
    return BatchJob.find().sort({ createdAt: -1 }).limit(50).populate('createdBy', 'name email');
  }

  async getJobStatus(jobId: string): Promise<IBatchJob | null> {
    return BatchJob.findById(jobId).populate('createdBy', 'name email');
  }

  async updateJobStatus(jobId: string, status: string, stats?: any): Promise<IBatchJob | null> {
    const update: any = { status };
    if (stats) update.stats = stats;
    return BatchJob.findByIdAndUpdate(jobId, update, { new: true });
  }
}
