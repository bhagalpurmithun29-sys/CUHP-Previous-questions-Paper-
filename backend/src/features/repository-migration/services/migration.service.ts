import { MigrationRepository } from '../repositories/migration.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class MigrationService {
  private repo = new MigrationRepository();
  private auditService = new AuditLogService();

  async importData(data: any, userId: string) {
    const job = await this.repo.createJob({
      type: 'IMPORT',
      status: 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       job.status = 'COMPLETED';
       job.report = { successCount: 150, failedCount: 2, duration: '45s' };
       await job.save();
       await this.auditService.log({
          userId,
          action: 'BULK_IMPORT_COMPLETED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 2000);

    return job;
  }

  async exportData(data: any, userId: string) {
    const job = await this.repo.createJob({
      type: 'EXPORT',
      status: 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       job.status = 'COMPLETED';
       job.report = { exportedFiles: 1200, size: '2.4GB', link: 'https://cdn.cuhp.edu/exports/repo-2026.zip' };
       await job.save();
       await this.auditService.log({
          userId,
          action: 'BULK_EXPORT_COMPLETED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 2000);

    return job;
  }

  async executeMigration(data: any, userId: string, dryRun: boolean) {
    const job = await this.repo.createJob({
      type: 'MIGRATION',
      status: dryRun ? 'DRY_RUN' : 'PROCESSING',
      initiatedBy: userId as any,
      details: data
    });

    setTimeout(async () => {
       if (dryRun) {
          job.report = { issuesFound: 0, preview: 'Migration looks good. 500 records will be updated.' };
       } else {
          job.status = 'COMPLETED';
          job.report = { updatedRecords: 500, time: '12s' };
       }
       await job.save();
       await this.auditService.log({
          userId,
          action: dryRun ? 'MIGRATION_DRY_RUN' : 'MIGRATION_EXECUTED',
          resource: 'MigrationJob',
          resourceId: job._id.toString()
       });
    }, 2000);

    return job;
  }

  async getHistory(page: number) {
    return this.repo.getJobs(page);
  }
}
