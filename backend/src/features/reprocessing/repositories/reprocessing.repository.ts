import { ReprocessingJob, IReprocessingJob } from '../models/reprocessing.model';

export class ReprocessingRepository {
  async createJob(jobData: Partial<IReprocessingJob>): Promise<IReprocessingJob> {
    return ReprocessingJob.create(jobData);
  }

  async getHistory(): Promise<IReprocessingJob[]> {
    return ReprocessingJob.find().sort({ createdAt: -1 }).limit(50).populate('triggeredBy', 'name email');
  }

  async getJobStatus(jobId: string): Promise<IReprocessingJob | null> {
    return ReprocessingJob.findById(jobId).populate('triggeredBy', 'name email');
  }

  async updateJobStatus(jobId: string, status: string, additionalData: any = {}): Promise<IReprocessingJob | null> {
    return ReprocessingJob.findByIdAndUpdate(jobId, { status, ...additionalData }, { new: true });
  }
}
