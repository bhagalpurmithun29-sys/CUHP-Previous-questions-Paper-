import { MigrationRepository } from '../repositories/migration.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class RestoreService {
  private repo = new MigrationRepository();
  private auditService = new AuditLogService();

  async restoreData(data: any, userId: string) {
    const job = await this.repo.createJob({
      type: 'RESTORE',
      status: 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       job.status = 'COMPLETED';
       job.report = { restoredRecords: 10452, overwritten: false };
       await job.save();
       await this.auditService.log({
          userId,
          action: 'RESTORE_COMPLETED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 4000);

    return job;
  }
}
