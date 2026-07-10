import { AnalysisJob } from '../../../models/analysis.model';

export class AnalysisRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return AnalysisJob.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return AnalysisJob.findOne({ paperId }).populate('paperId', 'title subject course');
  }

  async getQueue() {
    return AnalysisJob.find({ status: { $in: ['QUEUED', 'PROCESSING', 'RETRYING'] } })
      .sort({ priority: -1, createdAt: 1 })
      .populate('paperId', 'title subject');
  }
}
