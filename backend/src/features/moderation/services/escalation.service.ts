import { ReportPriority } from '../../../interfaces/report.interface';
import { ModerationRepository } from '../repositories/moderation.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';

export class EscalationService {
  private repository = new ModerationRepository();
  private auditService = new AuditLogService();

  async escalateReport(reportId: string, moderatorId: string, reason: string) {
    const report = await this.repository.updateReport(reportId, { 
      priority: ReportPriority.CRITICAL 
    });
    
    if (!report) throw new AppError('Report not found', 404);

    await this.auditService.log({
      userId: moderatorId,
      action: 'REPORT_ESCALATED',
      resource: 'Report',
      resourceId: reportId,
      details: { reason }
    });
    
    return report;
  }
}
