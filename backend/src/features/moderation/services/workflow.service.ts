import { ReportStatus } from '../../../interfaces/report.interface';
import { ModerationRepository } from '../repositories/moderation.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';

export class WorkflowService {
  private repository = new ModerationRepository();
  private auditService = new AuditLogService();

  async assignModerator(reportId: string, assigneeId: string, assignerId: string) {
    const report = await this.repository.updateReport(reportId, { 
      assigneeId, 
      status: ReportStatus.ASSIGNED 
    });
    if (!report) throw new AppError('Report not found', 404);

    await this.auditService.log({
      userId: assignerId,
      action: 'MODERATOR_ASSIGNED',
      resource: 'Report',
      resourceId: reportId,
      details: { assigneeId }
    });
    return report;
  }

  async approveReport(reportId: string, moderatorId: string, notes?: string) {
    const report = await this.repository.updateReport(reportId, {
      status: ReportStatus.RESOLVED,
      resolvedAt: new Date(),
      resolvedById: moderatorId,
      resolutionNotes: notes
    });
    if (!report) throw new AppError('Report not found', 404);

    await this.auditService.log({
      userId: moderatorId,
      action: 'REPORT_RESOLVED',
      resource: 'Report',
      resourceId: reportId,
      details: { notes, outcome: 'APPROVED' }
    });
    return report;
  }

  async rejectReport(reportId: string, moderatorId: string, notes?: string) {
    const report = await this.repository.updateReport(reportId, {
      status: ReportStatus.CLOSED,
      resolvedAt: new Date(),
      resolvedById: moderatorId,
      resolutionNotes: notes
    });
    if (!report) throw new AppError('Report not found', 404);

    await this.auditService.log({
      userId: moderatorId,
      action: 'REPORT_CLOSED',
      resource: 'Report',
      resourceId: reportId,
      details: { notes, outcome: 'REJECTED' }
    });
    return report;
  }
}
