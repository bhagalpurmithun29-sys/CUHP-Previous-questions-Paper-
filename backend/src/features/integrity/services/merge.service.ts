import { DuplicateReport } from '../../../models/duplicateReport.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';
import { DuplicateResolutionAction } from '../../../interfaces/duplicate.interface';

export class MergeService {
  private auditService = new AuditLogService();

  async mergePapers(reportId: string, moderatorId: string, resolutionNotes: string) {
    const report = await DuplicateReport.findById(reportId);
    if (!report) throw new AppError('Report not found', 404);

    const newPaper = await QuestionPaper.findOne({ paperId: report.newPaperId });
    const matchedPaper = await QuestionPaper.findOne({ paperId: report.matchedPaperId });

    if (!newPaper || !matchedPaper) {
      report.resolved = true;
      report.finalAction = DuplicateResolutionAction.IGNORE;
      report.resolutionNotes = 'One of the papers no longer exists.';
      await report.save();
      throw new AppError('One of the papers no longer exists', 400);
    }
    
    newPaper.isDeleted = true;
    newPaper.deletedAt = new Date();
    await newPaper.save();

    report.resolved = true;
    report.resolvedAt = new Date();
    report.resolvedBy = moderatorId as any;
    report.finalAction = DuplicateResolutionAction.MERGE;
    report.resolutionNotes = resolutionNotes;
    await report.save();

    await this.auditService.log({
      userId: moderatorId,
      action: 'MERGE_COMPLETED',
      resource: 'DuplicateReport',
      resourceId: reportId,
      details: { newPaperId: report.newPaperId, matchedPaperId: report.matchedPaperId }
    });

    return report;
  }
}
