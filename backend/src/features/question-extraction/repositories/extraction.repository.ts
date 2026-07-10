import { ExtractionJob } from '../../../models/extraction.model';

export class ExtractionRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return ExtractionJob.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return ExtractionJob.findOne({ paperId }).populate('paperId', 'title subject course');
  }

  async getQueue() {
    return ExtractionJob.find({ status: { $in: ['QUEUED', 'PROCESSING', 'RETRYING'] } })
      .sort({ priority: -1, createdAt: 1 })
      .populate('paperId', 'title subject');
  }
}
