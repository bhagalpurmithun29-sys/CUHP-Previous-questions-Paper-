import { VersionRepository } from '../repositories/version.repository';
import { AppError } from '../../../utils/AppError';
import { AuditLogService } from '../../audit/services/audit.service';

export class ComparisonService {
  private repository = new VersionRepository();
  private auditService = new AuditLogService();

  async compareVersions(paperId: string, versionId1: string, versionId2: string, userId: string) {
    const v1 = await this.repository.getVersionById(versionId1);
    const v2 = await this.repository.getVersionById(versionId2);

    if (!v1 || !v2) {
      throw new AppError('One or both versions not found', 404);
    }

    await this.auditService.log({
      userId,
      action: 'VERSION_COMPARED',
      resource: 'QuestionPaper',
      resourceId: paperId,
      details: { version1: v1.versionNumber, version2: v2.versionNumber }
    });

    return {
      paperId,
      baseVersion: v1,
      targetVersion: v2,
      differences: {
        fileSizeDiff: (v2.pdfMetadata?.sizeBytes || 0) - (v1.pdfMetadata?.sizeBytes || 0),
        checksumMatch: v1.checksum === v2.checksum,
        mimeTypeChanged: v1.pdfMetadata?.mimeType !== v2.pdfMetadata?.mimeType
      }
    };
  }
}
