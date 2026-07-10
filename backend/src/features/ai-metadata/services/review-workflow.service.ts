import { AIMetadata } from '../../../models/aiMetadata.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AppError } from '../../../utils/AppError';
import { AuditLogService } from '../../audit/services/audit.service';

export class ReviewWorkflowService {
  private auditService = new AuditLogService();

  async reviewMetadata(paperId: string, acceptedSuggestions: any, moderatorId: string) {
    const record = await AIMetadata.findOne({ paperId });
    if (!record) throw new AppError('AI Metadata record not found', 404);

    record.moderatorReviewed = true;
    record.reviewedBy = moderatorId as any;
    record.reviewedAt = new Date();
    record.status = 'COMPLETED';
    
    if (record.suggestions) {
       for (const key of Object.keys(record.suggestions)) {
           if ((record.suggestions as any)[key]) {
               (record.suggestions as any)[key].isAccepted = !!acceptedSuggestions[key];
           }
       }
    }

    await record.save();

    const updates: any = {};
    for (const key of Object.keys(acceptedSuggestions)) {
      if (acceptedSuggestions[key]) {
         updates[key] = acceptedSuggestions[key];
      }
    }
    
    if (Object.keys(updates).length > 0) {
      await QuestionPaper.findByIdAndUpdate(paperId, updates);
    }

    await this.auditService.log({
      userId: moderatorId,
      action: 'AI_METADATA_APPROVED',
      resource: 'AIMetadata',
      resourceId: record._id.toString(),
      details: { paperId, updates }
    });

    return record;
  }
}
