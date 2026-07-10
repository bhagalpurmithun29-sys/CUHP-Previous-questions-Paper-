import { ReprocessingRepository } from '../repositories/reprocessing.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class ReprocessingService {
  private repo = new ReprocessingRepository();
  private auditService = new AuditLogService();

  async startJob(data: any, userId: string) {
    const job = await this.repo.createJob({
      ...data,
      triggeredBy: userId,
      status: 'PENDING'
    });

    await this.auditService.log({
      userId,
      action: 'REPROCESSING_STARTED',
      resourceId: job._id.toString(),
      resourceType: 'REPROCESSING_JOB'
    });

    // Simulate async processing
    setTimeout(async () => {
      await this.repo.updateJobStatus(job._id.toString(), 'COMPLETED', { duration: 4500 });
      await this.auditService.log({
        userId,
        action: 'REPROCESSING_COMPLETED',
        resourceId: job._id.toString(),
        resourceType: 'REPROCESSING_JOB'
      });
    }, 2000);

    return job;
  }

  async startBatch(data: any, userId: string) {
    // Similar to startJob, but handles batch tracking
    const job = await this.repo.createJob({
      ...data,
      triggeredBy: userId,
      status: 'PENDING'
    });

    await this.auditService.log({
      userId,
      action: 'BATCH_REPROCESSING_STARTED',
      resourceId: job._id.toString(),
      resourceType: 'REPROCESSING_JOB'
    });

    return job;
  }

  async getHistory() {
    return this.repo.getHistory();
  }

  async getStatus(jobId: string) {
    return this.repo.getJobStatus(jobId);
  }

  async retryJob(jobId: string, userId: string) {
    const job = await this.repo.updateJobStatus(jobId, 'PENDING');
    
    await this.auditService.log({
      userId,
      action: 'RETRY_EXECUTED',
      resourceId: jobId,
      resourceType: 'REPROCESSING_JOB'
    });

    return job;
  }
}
