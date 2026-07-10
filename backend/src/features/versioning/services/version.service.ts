import { VersionRepository } from '../repositories/version.repository';

export class VersionService {
  private repository = new VersionRepository();

  async getVersionHistory(paperId: string) {
    const [fileVersions, metadataHistory] = await Promise.all([
      this.repository.getPaperVersions(paperId),
      this.repository.getPaperMetadataHistory(paperId)
    ]);

    const timeline = [
      ...fileVersions.map(v => ({
        id: v._id,
        type: 'FILE_CHANGE',
        versionNumber: v.versionNumber,
        author: v.uploaderId,
        timestamp: v.createdAt,
        details: v.changeLog || 'File uploaded/updated',
        fileData: { url: v.storageUrl, size: v.pdfMetadata?.sizeBytes, checksum: v.checksum }
      })),
      ...metadataHistory.map(m => ({
        id: m._id,
        type: 'METADATA_CHANGE',
        author: m.editorId,
        timestamp: m.timestamp,
        details: 'Metadata updated',
        changes: m.changes
      }))
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return timeline;
  }
  
  async getVersionById(versionId: string) {
    return this.repository.getVersionById(versionId);
  }
}
