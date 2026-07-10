import { BloomRepository } from '../repositories/bloom.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomLevel } from '../../../models/bloom.model';

export class BloomService {
  private repo = new BloomRepository();
  private auditService = new AuditLogService();
  private extractionRepo = new ExtractionRepository();

  async processPaper(paperId: string, userId: string) {
    const extractionJob = await this.extractionRepo.getJob(paperId);
    if (!extractionJob || extractionJob.status !== 'COMPLETED' || extractionJob.reviewStatus !== 'APPROVED') {
        throw new Error('Question extraction must be completed and approved before Bloom classification.');
    }

    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      errorMessage: null,
      classifications: []
    });

    this.runWorker(paperId, userId, extractionJob.extractedQuestions);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    return this.processPaper(paperId, userId);
  }

  private async runWorker(paperId: string, userId: string, questions: any[]) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         const levels: BloomLevel[] = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
         const classifications = questions.map(q => {
             const level = levels[Math.floor(Math.random() * levels.length)];
             return {
                 questionId: q.id,
                 bloomLevel: level,
                 confidenceScore: 75 + Math.floor(Math.random() * 20),
                 reasoningSummary: `The question "${q.questionText.substring(0, 30)}..." requires the student to ${level.toLowerCase()} concepts related to the topic.`,
                 reviewStatus: 'PENDING_REVIEW'
             };
         });
         
         const distribution = {
             remember: classifications.filter(c => c.bloomLevel === 'Remember').length,
             understand: classifications.filter(c => c.bloomLevel === 'Understand').length,
             apply: classifications.filter(c => c.bloomLevel === 'Apply').length,
             analyze: classifications.filter(c => c.bloomLevel === 'Analyze').length,
             evaluate: classifications.filter(c => c.bloomLevel === 'Evaluate').length,
             create: classifications.filter(c => c.bloomLevel === 'Create').length,
         };
         
         const overallConfidence = classifications.length > 0 
            ? classifications.reduce((acc, curr) => acc + curr.confidenceScore, 0) / classifications.length 
            : 0;

         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             classifications,
             distribution,
             overallConfidence
         });
         
         await this.auditService.log({
            userId,
            action: 'BLOOM_CLASSIFICATION_COMPLETED',
            resource: 'BloomClassification',
            resourceId: paperId
         });
      }, 4000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getQuestionClassification(paperId: string, questionId: string) {
      return this.repo.getQuestion(paperId, questionId);
  }
  
  async reviewClassification(paperId: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', userId: string, manualOverrideLevel?: string) {
      const reviewStatus = action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'EDITED';
      const job = await this.repo.updateQuestionReview(paperId, questionId, reviewStatus, manualOverrideLevel);
      
      await this.auditService.log({
        userId,
        action: `BLOOM_CLASSIFICATION_${reviewStatus}`,
        resource: 'BloomClassification',
        resourceId: `${paperId}-${questionId}`
      });
      
      return job;
  }
}
