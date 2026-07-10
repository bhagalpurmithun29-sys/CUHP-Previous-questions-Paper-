import { DownloadService } from '../services/download.service';
import { StorageService } from '../services/storage.service';
import { DownloadHistoryService } from '../services/download-history.service';

jest.mock('../services/storage.service');
jest.mock('../services/download-history.service');

describe('DownloadService', () => {
  let downloadService: DownloadService;
  
  beforeEach(() => {
    downloadService = new DownloadService();
  });

  it('should initiate a single download successfully', async () => {
    StorageService.prototype.getPaperDownloadUrl = jest.fn().mockResolvedValue('http://mock-url.com/file.pdf');
    DownloadHistoryService.prototype.logDownloadStart = jest.fn().mockResolvedValue({ _id: 'mock-history-id' });

    const result = await downloadService.initiateDownload('user123', 'paper123', '127.0.0.1', 'jest-agent');
    
    expect(result.downloadUrl).toBe('http://mock-url.com/file.pdf');
    expect(result.historyId).toBe('mock-history-id');
  });

  it('should handle batch downloads and return results array', async () => {
    StorageService.prototype.getPaperDownloadUrl = jest.fn().mockResolvedValue('http://mock-url.com/file.pdf');
    DownloadHistoryService.prototype.logDownloadStart = jest.fn().mockResolvedValue({ _id: 'mock-history-id' });

    const results = await downloadService.processBatchDownloads('user123', ['paper1', 'paper2'], '127.0.0.1', 'jest-agent');
    
    expect(results).toHaveLength(2);
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
  });
});
