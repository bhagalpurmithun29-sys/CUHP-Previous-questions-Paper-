import { ExtractionRepository } from '../repositories/extraction.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class ExtractionService {
  private repo = new ExtractionRepository();
  private auditService = new AuditLogService();

  async processPaper(paperId: string, userId: string, priority: number = 0) {
    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      priority,
      retryCount: 0,
      errorMessage: null,
      reviewStatus: 'PENDING_REVIEW'
    });

    this.runWorker(paperId, userId);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      priority: 10,
      retryCount: 0,
      errorMessage: null,
      reviewStatus: 'PENDING_REVIEW'
    });

    this.runWorker(paperId, userId);

    return job;
  }

  private async runWorker(paperId: string, userId: string) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         const extractedQuestions = [
            {
               id: 'q1',
               section: 'A',
               questionNumber: '1',
               parentQuestion: null,
               subQuestion: 'a',
               questionText: 'Explain the principles of Object-Oriented Programming.',
               marks: 5,
               choiceGroup: null,
               questionType: 'Long Answer',
               estimatedConfidence: 95
            },
            {
               id: 'q2',
               section: 'B',
               questionNumber: '2',
               parentQuestion: null,
               subQuestion: null,
               questionText: 'What is a binary tree? Discuss its traversal methods.',
               marks: 10,
               choiceGroup: 'OR_GROUP_1',
               questionType: 'Long Answer',
               estimatedConfidence: 92
            }
         ];
         
         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             extractedQuestions,
             overallConfidence: 93.5,
             processingTime: 5.6
         });
         
         await this.auditService.log({
            userId,
            action: 'EXTRACTION_COMPLETED',
            resource: 'ExtractionJob',
            resourceId: paperId
         });
      }, 4000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getQuestions(paperId: string) {
    const job = await this.repo.getJob(paperId);
    if (!job || job.status !== 'COMPLETED') return null;
    return job;
  }
  
  async reviewExtraction(paperId: string, action: 'APPROVE' | 'REJECT', userId: string) {
      const job = await this.repo.createOrUpdateJob(paperId, {
          reviewStatus: action === 'APPROVE' ? 'APPROVED' : 'REJECTED'
      });
      
      await this.auditService.log({
        userId,
        action: action === 'APPROVE' ? 'EXTRACTION_APPROVED' : 'EXTRACTION_REJECTED',
        resource: 'ExtractionJob',
        resourceId: paperId
      });
      
      return job;
  }

  async getQueue() {
    return this.repo.getQueue();
  }
}
