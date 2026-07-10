import { BatchRepository } from '../repositories/batch.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class BatchService {
  private repo = new BatchRepository();
  private auditService = new AuditLogService();

  async startJob(data: any, userId: string) {
    const job = await this.repo.createJob({
      ...data,
      createdBy: userId,
      status: 'QUEUED',
      stats: { total: data.scopeIds?.length || 100, completed: 0, failed: 0, skipped: 0 }
    });

    await this.auditService.log({
      userId,
      action: 'BATCH_STARTED',
      resourceId: job._id.toString(),
      resourceType: 'BATCH_JOB'
    });

    // Simulate async execution
    setTimeout(async () => {
      await this.repo.updateJobStatus(job._id.toString(), 'COMPLETED', {
        total: data.scopeIds?.length || 100,
        completed: data.scopeIds?.length || 100,
        failed: 0,
        skipped: 0
      });
      await this.auditService.log({
        userId,
        action: 'BATCH_COMPLETED',
        resourceId: job._id.toString(),
        resourceType: 'BATCH_JOB'
      });
    }, 3000);

    return job;
  }

  async getHistory() {
    return this.repo.getHistory();
  }

  async getStatus(jobId: string) {
    return this.repo.getJobStatus(jobId);
  }

  async cancelJob(jobId: string, userId: string) {
    const job = await this.repo.updateJobStatus(jobId, 'CANCELLED');
    
    await this.auditService.log({
      userId,
      action: 'BATCH_CANCELLED',
      resourceId: jobId,
      resourceType: 'BATCH_JOB'
    });

    return job;
  }
}
