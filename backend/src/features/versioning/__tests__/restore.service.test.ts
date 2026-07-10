import { RestoreService } from '../services/restore.service';
import { VersionRepository } from '../repositories/version.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/version.repository');
jest.mock('../../audit/services/audit.service');

describe('RestoreService', () => {
  let restoreService: RestoreService;
  
  beforeEach(() => {
    restoreService = new RestoreService();
    (restoreService as any).repository = new VersionRepository();
    (restoreService as any).auditService = new AuditLogService();
  });

  it('should create a new version when restoring without overwriting', async () => {
    const mockVersionToRestore = { 
      _id: 'oldVersionId', 
      versionNumber: 1, 
      storageUrl: 'url1', 
      checksum: 'chk1', 
      pdfMetadata: { sizeBytes: 1000 } 
    };
    const mockCurrentPaper = { _id: 'paperId', version: 3 };
    const mockNewVersion = { _id: 'newVersionId', versionNumber: 4 };

    (restoreService as any).repository.getVersionById.mockResolvedValue(mockVersionToRestore);
    (restoreService as any).repository.getPaper.mockResolvedValue(mockCurrentPaper);
    (restoreService as any).repository.createVersion.mockResolvedValue(mockNewVersion);
    (restoreService as any).repository.updatePaper.mockResolvedValue(true);
    (restoreService as any).auditService.log.mockResolvedValue(true);

    const result = await restoreService.restoreFileVersion('paperId', 'oldVersionId', 'user123');

    expect(result).toEqual(mockNewVersion);
    expect((restoreService as any).repository.createVersion).toHaveBeenCalledWith(expect.objectContaining({
      versionNumber: 4,
      storageUrl: 'url1',
      changeLog: 'Restored from version 1'
    }));
    expect((restoreService as any).repository.updatePaper).toHaveBeenCalledWith('paperId', expect.objectContaining({
      version: 4,
      fileUrl: 'url1'
    }));
  });
});
