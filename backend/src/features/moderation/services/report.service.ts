import { ModerationRepository } from '../repositories/moderation.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';

export class ReportService {
  private repository = new ModerationRepository();
  private auditService = new AuditLogService();

  async createReport(reporterId: string, data: any) {
    const report = await this.repository.createReport({ ...data, reporterId });
    await this.auditService.log({
      userId: reporterId,
      action: 'REPORT_SUBMITTED',
      resource: 'Report',
      resourceId: report._id.toString(),
      details: { type: data.type }
    });
    return report;
  }

  async getReports(query: any) {
    const limit = parseInt(query.limit) || 20;
    const skip = ((parseInt(query.page) || 1) - 1) * limit;
    
    const filters: any = {};
    if (query.status) filters.status = query.status;
    if (query.assigneeId) filters.assigneeId = query.assigneeId;
    if (query.priority) filters.priority = query.priority;

    const [data, total] = await Promise.all([
      this.repository.getReports(filters, limit, skip),
      this.repository.getReportCount(filters)
    ]);

    return { data, total, page: parseInt(query.page) || 1, limit, totalPages: Math.ceil(total / limit) };
  }

  async getReportById(id: string) {
    const report = await this.repository.getReportById(id);
    if (!report) throw new AppError('Report not found', 404);
    return report;
  }
  
  async updateReport(id: string, userId: string, data: any) {
     const report = await this.repository.updateReport(id, data);
     if (!report) throw new AppError('Report not found', 404);
     await this.auditService.log({
        userId,
        action: 'REPORT_UPDATED',
        resource: 'Report',
        resourceId: id,
        details: { fields: Object.keys(data) }
     });
     return report;
  }
}
