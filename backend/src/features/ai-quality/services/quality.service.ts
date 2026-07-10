import { QualityRepository } from '../repositories/quality.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class QualityService {
  private repo = new QualityRepository();
  private auditService = new AuditLogService();

  async getQueue(status?: string) {
    return this.repo.getQueue(status);
  }

  async getMetrics() {
    return this.repo.getMetrics();
  }

  async processReviewDecision(reviewId: string, decision: { status: string, notes?: string, errorCategory?: string, correctedOutput?: any }, userId: string) {
    const review = await this.repo.updateReviewStatus(reviewId, decision.status, decision.notes, decision.errorCategory, decision.correctedOutput);
    if (!review) throw new Error('Review task not found');

    await this.auditService.log({
      userId,
      action: `REVIEW_DECISION_${decision.status}`,
      resourceId: reviewId,
      resourceType: 'REVIEW_TASK'
    });

    return review;
  }

  async requestReprocess(reviewId: string, userId: string) {
    const review = await this.repo.updateReviewStatus(reviewId, 'PENDING_REVIEW', 'Requested reprocessing from LLM');
    
    await this.auditService.log({
      userId,
      action: 'REVIEW_REPROCESS_REQUESTED',
      resourceId: reviewId,
      resourceType: 'REVIEW_TASK'
    });
    
    // In real system, push to message queue to trigger LLM re-run
    return review;
  }
}
