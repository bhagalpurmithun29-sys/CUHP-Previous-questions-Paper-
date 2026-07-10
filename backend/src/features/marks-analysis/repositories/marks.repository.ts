import { MarksAnalysis } from '../../../models/marks-analysis.model';

export class MarksRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return MarksAnalysis.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return MarksAnalysis.findOne({ paperId });
  }

  async updateReview(paperId: string, reviewStatus: string) {
      return MarksAnalysis.findOneAndUpdate(
          { paperId },
          { $set: { reviewStatus } },
          { new: true }
      );
  }
}
