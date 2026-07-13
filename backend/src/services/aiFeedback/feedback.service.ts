import { feedbackRepository } from '../../repositories/feedback.repository';
import { AppError } from '../../utils/AppError';

class FeedbackService {
  async submitFeedback(data: any, userId: string) {
    if (!data.responseId || !data.type) {
      throw new AppError('Response ID and Feedback Type are required', 400);
    }
    
    // Type could be THUMBS_UP, THUMBS_DOWN, STAR_RATING, WRITTEN, REPORT
    return feedbackRepository.saveFeedback(data, userId);
  }

  async getUserHistory(userId: string) {
    return feedbackRepository.getFeedbackHistory(userId);
  }

  async getPendingQueue() {
    return feedbackRepository.getPendingEvaluations();
  }
}

export const feedbackService = new FeedbackService();
