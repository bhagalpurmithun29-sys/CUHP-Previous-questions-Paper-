import { MigrationRepository } from '../repositories/migration.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class BackupService {
  private repo = new MigrationRepository();
  private auditService = new AuditLogService();

  async createBackup(data: any, userId: string) {
    const job = await this.repo.createJob({
      type: 'BACKUP',
      status: 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       job.status = 'COMPLETED';
       job.report = { backupId: 'bck-20260710', size: '5.1GB', location: 'AWS_S3_GLACIER' };
       await job.save();
       await this.auditService.log({
          userId,
          action: 'BACKUP_CREATED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 3000);

    return job;
  }
}
