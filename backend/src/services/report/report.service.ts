import { Report } from '../../models/report.model';
import { ReportComment } from '../../models/reportComment.model';
import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { AppError } from '../../utils/AppError';
import { ReportStatus, ReportPriority } from '../../interfaces/report.interface';
import { Types } from 'mongoose';

export class ReportService {
  private paperRepository = new QuestionPaperRepository();

  public async createReport(data: any, reporterId: string) {
    // 1. Verify paper exists
    const paper = await this.paperRepository.findById(data.paperId);
    if (!paper) throw new AppError('Question Paper not found', 404);

    // 2. Create the report
    const report = await Report.create({
      ...data,
      reporterId,
      status: ReportStatus.OPEN,
      priority: data.priority || ReportPriority.LOW
    });

    // 3. (Placeholder) Trigger notification to Moderators/Admins
    // notificationService.notifyModerators({ type: 'NEW_REPORT', reportId: report._id })
    
    // 4. Update Paper analytics
    await this.paperRepository.incrementAnalytics(data.paperId, 'reportCount');

    return report;
  }

  public async getReports(query: any, page: number = 1, limit: number = 20) {
    const filter: any = {};
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assigneeId) filter.assigneeId = query.assigneeId;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Report.find(filter)
        .populate('reporterId', 'fullName email')
        .populate('assigneeId', 'fullName')
        .populate('paperId', 'title')
        .sort({ priority: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Report.countDocuments(filter)
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async getReportDetails(reportId: string, userId: string, role: string) {
    const report = await Report.findById(reportId)
      .populate('reporterId', 'fullName email')
      .populate('assigneeId', 'fullName')
      .populate('paperId', 'title subjectId academicYear originalFileName');

    if (!report) throw new AppError('Report not found', 404);

    // Permissions: Students can only view their own
    if (role === 'STUDENT' && report.reporterId._id.toString() !== userId.toString()) {
      throw new AppError('Unauthorized access to report', 403);
    }

    // Fetch comments
    let commentQuery: any = { reportId };
    if (role === 'STUDENT') {
      commentQuery.isInternalNote = false;
    }

    const comments = await ReportComment.find(commentQuery)
      .populate('userId', 'fullName role profileImage')
      .sort({ createdAt: 1 });

    return { report, comments };
  }

  public async addComment(reportId: string, userId: string, text: string, isInternalNote: boolean = false) {
    const report = await Report.findById(reportId);
    if (!report) throw new AppError('Report not found', 404);

    const comment = await ReportComment.create({ reportId, userId, text, isInternalNote });
    
    // Auto-update status if it was just assigned and they are working on it
    if (report.status === ReportStatus.ASSIGNED) {
       report.status = ReportStatus.UNDER_REVIEW;
       await report.save();
    }

    return comment;
  }

  public async updateStatus(reportId: string, status: ReportStatus, resolvedById?: string, resolutionNotes?: string) {
    const report = await Report.findById(reportId);
    if (!report) throw new AppError('Report not found', 404);

    report.status = status;
    if (status === ReportStatus.RESOLVED || status === ReportStatus.CLOSED) {
      report.resolvedAt = new Date();
      if (resolvedById) report.resolvedById = new Types.ObjectId(resolvedById);
      if (resolutionNotes) report.resolutionNotes = resolutionNotes;
    }

    if (status === ReportStatus.REOPENED) {
       report.resolvedAt = undefined;
       report.resolvedById = undefined;
    }

    await report.save();
    return report;
  }

  public async assignReport(reportId: string, assigneeId: string) {
    const report = await Report.findByIdAndUpdate(
      reportId,
      { assigneeId: new Types.ObjectId(assigneeId), status: ReportStatus.ASSIGNED },
      { new: true }
    );
    if (!report) throw new AppError('Report not found', 404);
    return report;
  }
}

export const reportService = new ReportService();
