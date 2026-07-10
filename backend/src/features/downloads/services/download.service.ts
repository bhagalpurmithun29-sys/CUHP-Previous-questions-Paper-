import { StorageService } from './storage.service';
import { DownloadHistoryService } from './download-history.service';
import { DownloadStatus } from '../../../interfaces/download.interface';
import { AppError } from '../../../utils/AppError';

export class DownloadService {
  private storageService: StorageService;
  private historyService: DownloadHistoryService;

  constructor() {
    this.storageService = new StorageService();
    this.historyService = new DownloadHistoryService();
  }

  async initiateDownload(userId: string, paperId: string, ip: string, userAgent: string) {
    const downloadUrl = await this.storageService.getPaperDownloadUrl(paperId);
    const history = await this.historyService.logDownloadStart(userId, paperId, ip, userAgent, downloadUrl);
    return {
      historyId: history._id,
      downloadUrl,
    };
  }

  async updateDownloadStatus(historyId: string, status: string) {
    if (!Object.values(DownloadStatus).includes(status as DownloadStatus)) {
        throw new AppError('Invalid status', 400);
    }
    return this.historyService.markDownloadStatus(historyId, status as DownloadStatus);
  }

  async processBatchDownloads(userId: string, paperIds: string[], ip: string, userAgent: string) {
    const results = [];
    for (const paperId of paperIds) {
      try {
        const result = await this.initiateDownload(userId, paperId, ip, userAgent);
        results.push({ paperId, success: true, ...result });
      } catch (error: any) {
        results.push({ paperId, success: false, error: error.message });
      }
    }
    return results;
  }
}
