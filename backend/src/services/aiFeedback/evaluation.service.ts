import { feedbackRepository } from '../../repositories/feedback.repository';
import { AppError } from '../../utils/AppError';

class EvaluationService {
  async submitEvaluation(feedbackId: string, evaluationData: any, reviewerId: string) {
    if (!evaluationData.decision || !evaluationData.notes) {
      throw new AppError('Evaluation decision and notes are required', 400);
    }

    // decision: 'ACCEPT', 'REJECT', 'NEEDS_IMPROVEMENT'
    return feedbackRepository.saveEvaluation(feedbackId, evaluationData, reviewerId);
  }
}

export const evaluationService = new EvaluationService();
