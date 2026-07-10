import { BloomClassification } from '../../../models/bloom.model';

export class BloomRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return BloomClassification.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return BloomClassification.findOne({ paperId });
  }

  async getQuestion(paperId: string, questionId: string) {
    const job = await BloomClassification.findOne({ paperId });
    if (!job) return null;
    return job.classifications.find((c: any) => c.questionId === questionId);
  }

  async updateQuestionReview(paperId: string, questionId: string, reviewStatus: string, manualOverrideLevel?: string) {
      const updateData: any = {
          'classifications.$.reviewStatus': reviewStatus
      };
      if (manualOverrideLevel) {
          updateData['classifications.$.manualOverrideLevel'] = manualOverrideLevel;
      }
      
      return BloomClassification.findOneAndUpdate(
          { paperId, 'classifications.questionId': questionId },
          { $set: updateData },
          { new: true }
      );
  }
}
