import { AnalysisRepository } from '../repositories/analysis.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class AnalysisService {
  private repo = new AnalysisRepository();
  private auditService = new AuditLogService();

  async processPaper(paperId: string, userId: string, priority: number = 0) {
    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      priority,
      retryCount: 0,
      errorMessage: null
    });

    this.runWorker(paperId, userId);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      priority: 10,
      retryCount: 0,
      errorMessage: null
    });

    this.runWorker(paperId, userId);

    return job;
  }

  private async runWorker(paperId: string, userId: string) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         const result = {
           questionCount: Math.floor(Math.random() * 20) + 5,
           confidenceScore: 85 + Math.floor(Math.random() * 15),
           processingTime: 4.2
         };
         
         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             result
         });
         
         await this.auditService.log({
            userId,
            action: 'ANALYSIS_COMPLETED',
            resource: 'AnalysisJob',
            resourceId: paperId
         });
      }, 3000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getResult(paperId: string) {
    const job = await this.repo.getJob(paperId);
    if (!job || job.status !== 'COMPLETED') return null;
    return job.result;
  }

  async getQueue() {
    return this.repo.getQueue();
  }
}
