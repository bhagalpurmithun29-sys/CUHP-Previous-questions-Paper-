import { OcrResult } from '../../../models/ocrResult.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AppError } from '../../../utils/AppError';
import { AuditLogService } from '../../audit/services/audit.service';

export class OcrReviewService {
  private auditService = new AuditLogService();

  async reviewOcr(paperId: string, correctedText: string, moderatorId: string) {
    const record = await OcrResult.findOne({ paperId });
    if (!record) throw new AppError('OCR record not found', 404);

    record.cleanedText = correctedText;
    record.status = 'COMPLETED';
    record.moderatorReviewed = true;
    record.reviewedBy = moderatorId as any;
    record.reviewedAt = new Date();
    await record.save();

    await QuestionPaper.findByIdAndUpdate(paperId, { ocrTextPlaceholder: correctedText });

    await this.auditService.log({
      userId: moderatorId,
      action: 'OCR_APPROVED',
      resource: 'OcrResult',
      resourceId: record._id.toString(),
      details: { paperId }
    });

    return record;
  }
}
