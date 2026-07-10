import { VersionRepository } from '../repositories/version.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { AppError } from '../../../utils/AppError';

export class RestoreService {
  private repository = new VersionRepository();
  private auditService = new AuditLogService();

  async restoreFileVersion(paperId: string, versionId: string, userId: string) {
    const versionToRestore = await this.repository.getVersionById(versionId);
    if (!versionToRestore) throw new AppError('Version not found', 404);

    const currentPaper = await this.repository.getPaper(paperId);
    if (!currentPaper) throw new AppError('Paper not found', 404);

    const newVersionNumber = currentPaper.version + 1;

    const newVersion = await this.repository.createVersion({
      paperId,
      versionNumber: newVersionNumber,
      storageUrl: versionToRestore.storageUrl,
      checksum: versionToRestore.checksum,
      uploaderId: userId,
      pdfMetadata: versionToRestore.pdfMetadata,
      changeLog: `Restored from version ${versionToRestore.versionNumber}`
    });

    await this.repository.updatePaper(paperId, {
      fileUrl: versionToRestore.storageUrl,
      storagePath: versionToRestore.storageUrl,
      checksum: versionToRestore.checksum,
      version: newVersionNumber,
      fileSize: versionToRestore.pdfMetadata?.sizeBytes
    });

    await this.auditService.log({
      userId,
      action: 'VERSION_RESTORED',
      resource: 'QuestionPaper',
      resourceId: paperId,
      details: { restoredFromVersion: versionToRestore.versionNumber, newVersionNumber }
    });

    return newVersion;
  }
}
