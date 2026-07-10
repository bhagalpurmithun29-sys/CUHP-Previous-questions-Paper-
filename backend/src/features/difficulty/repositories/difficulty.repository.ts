import { DifficultyAnalysis } from '../../../models/difficulty.model';

export class DifficultyRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return DifficultyAnalysis.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return DifficultyAnalysis.findOne({ paperId });
  }

  async getQuestion(paperId: string, questionId: string) {
    const job = await DifficultyAnalysis.findOne({ paperId });
    if (!job) return null;
    return job.analyses.find((a: any) => a.questionId === questionId);
  }

  async updateQuestionReview(paperId: string, questionId: string, reviewStatus: string, manualOverrides?: any) {
      const updateData: any = {
          'analyses.$.reviewStatus': reviewStatus
      };
      if (manualOverrides) {
          updateData['analyses.$.manualOverrides'] = manualOverrides;
      }
      
      return DifficultyAnalysis.findOneAndUpdate(
          { paperId, 'analyses.questionId': questionId },
          { $set: updateData },
          { new: true }
      );
  }
}
