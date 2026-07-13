import { offlineRepositoryService } from './offlineRepository.service';
import { cacheService } from './cache.service';

class DownloadService {
  async getActiveDownloads(userId: string) {
    return [
      { id: 'dl_001', resourceId: 'res_abc', status: 'DOWNLOADING', progress: 45 },
      { id: 'dl_002', resourceId: 'res_xyz', status: 'PAUSED', progress: 12 }
    ];
  }

  async startDownload(userId: string, resourceId: string) {
    // In reality, this might trigger a background job or return a chunked stream
    await offlineRepositoryService.logDownloadEvent(userId, resourceId, 'START');
    return { id: `dl_\${Date.now()}`, resourceId, status: 'STARTED' };
  }

  async pauseDownload(userId: string, downloadId: string) {
    return { id: downloadId, status: 'PAUSED' };
  }

  async resumeDownload(userId: string, downloadId: string) {
    return { id: downloadId, status: 'RESUMED' };
  }

  async cancelDownload(userId: string, downloadId: string) {
    return { id: downloadId, status: 'CANCELLED' };
  }

  async getStorage(userId: string) {
    return cacheService.getStorageQuota(userId);
  }
}

export const downloadService = new DownloadService();
