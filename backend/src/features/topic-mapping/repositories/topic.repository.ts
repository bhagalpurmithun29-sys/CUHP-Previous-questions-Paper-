import { TopicMapping } from '../../../models/topic.model';

export class TopicRepository {
  async createOrUpdateJob(paperId: string, data: any) {
    return TopicMapping.findOneAndUpdate(
      { paperId },
      { $set: data },
      { new: true, upsert: true }
    );
  }

  async getJob(paperId: string) {
    return TopicMapping.findOne({ paperId });
  }

  async getQuestion(paperId: string, questionId: string) {
    const job = await TopicMapping.findOne({ paperId });
    if (!job) return null;
    return job.mappings.find((m: any) => m.questionId === questionId);
  }

  async updateQuestionReview(paperId: string, questionId: string, reviewStatus: string, manualOverrides?: any) {
      const updateData: any = {
          'mappings.$.reviewStatus': reviewStatus
      };
      if (manualOverrides) {
          updateData['mappings.$.manualOverrides'] = manualOverrides;
      }
      
      return TopicMapping.findOneAndUpdate(
          { paperId, 'mappings.questionId': questionId },
          { $set: updateData },
          { new: true }
      );
  }
}
