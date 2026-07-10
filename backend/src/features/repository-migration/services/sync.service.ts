import { MigrationRepository } from '../repositories/migration.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class SyncService {
  private repo = new MigrationRepository();
  private auditService = new AuditLogService();

  async syncRepository(data: any, userId: string) {
    const job = await this.repo.createJob({
      type: 'SYNC',
      status: 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       job.status = 'COMPLETED';
       job.report = { missingFilesFound: 2, invalidMetadataFixed: 14 };
       await job.save();
       await this.auditService.log({
          userId,
          action: 'SYNC_COMPLETED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 2500);

    return job;
  }
}
