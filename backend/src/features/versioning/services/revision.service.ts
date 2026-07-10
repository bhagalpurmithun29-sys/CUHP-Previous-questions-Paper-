import { VersionRepository } from '../repositories/version.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';
import { PaperApprovalStatus } from '../../../interfaces/paper.interface';

export class RevisionService {
  private repository = new VersionRepository();
  private auditService = new AuditLogService();

  async approveVersion(paperId: string, versionId: string, approverId: string) {
    const version = await this.repository.getVersionById(versionId);
    if (!version) throw new AppError('Version not found', 404);

    const paper = await this.repository.updatePaper(paperId, {
      approvalStatus: PaperApprovalStatus.APPROVED,
      approverId,
      approvedAt: new Date()
    });

    await this.auditService.log({
      userId: approverId,
      action: 'VERSION_APPROVED',
      resource: 'QuestionPaper',
      resourceId: paperId,
      details: { versionId, versionNumber: version.versionNumber }
    });

    return paper;
  }
}
