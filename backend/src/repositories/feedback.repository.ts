import { Types } from 'mongoose';
import { AppError } from '../utils/AppError';

class FeedbackRepository {
  private feedbacks: any[] = [];
  private evaluations: any[] = [];

  async saveFeedback(data: any, userId: string) {
    const feedback = {
      id: new Types.ObjectId().toString(),
      ...data,
      userId,
      status: 'PENDING_REVIEW', // PENDING_REVIEW, REVIEWED
      timestamp: new Date()
    };
    this.feedbacks.unshift(feedback);
    return feedback;
  }

  async getFeedbackHistory(userId: string) {
    return this.feedbacks.filter(f => f.userId === userId);
  }

  async getPendingEvaluations() {
    return this.feedbacks.filter(f => f.status === 'PENDING_REVIEW');
  }

  async saveEvaluation(feedbackId: string, evaluationData: any, reviewerId: string) {
    const feedbackIdx = this.feedbacks.findIndex(f => f.id === feedbackId);
    if (feedbackIdx === -1) throw new AppError('Feedback not found', 404);

    this.feedbacks[feedbackIdx].status = 'REVIEWED';

    const evaluation = {
      id: new Types.ObjectId().toString(),
      feedbackId,
      ...evaluationData,
      reviewerId,
      timestamp: new Date()
    };
    this.evaluations.push(evaluation);
    return evaluation;
  }

  async getAllEvaluations() {
    return this.evaluations;
  }
}

export const feedbackRepository = new FeedbackRepository();
