import { PatternAnalysis } from '../../../models/pattern-analysis.model';

export class PatternRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return PatternAnalysis.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return PatternAnalysis.findOne({ paperId });
  }

  async updateReview(paperId: string, reviewStatus: string) {
      return PatternAnalysis.findOneAndUpdate(
          { paperId },
          { $set: { reviewStatus } },
          { new: true }
      );
  }
}
