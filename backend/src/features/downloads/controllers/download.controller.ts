import { Request, Response, NextFunction } from 'express';
import { DownloadService } from '../services/download.service';
import { DownloadHistoryService } from '../services/download-history.service';
import { OfflineLibraryService } from '../services/offline-library.service';

export class DownloadController {
  private downloadService: DownloadService;
  private historyService: DownloadHistoryService;
  private offlineLibraryService: OfflineLibraryService;

  constructor() {
    this.downloadService = new DownloadService();
    this.historyService = new DownloadHistoryService();
    this.offlineLibraryService = new OfflineLibraryService();
  }

  initiateSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const userId = req.user?.id || req.user?._id;
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      const data = await this.downloadService.initiateDownload(userId as string, paperId, ip, userAgent);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  initiateBatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperIds } = req.body;
      const userId = req.user?.id || req.user?._id;
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      const data = await this.downloadService.processBatchDownloads(userId as string, paperIds, ip, userAgent);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { historyId } = req.params;
      const { status } = req.body;
      const data = await this.downloadService.updateDownloadStatus(historyId, status);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.historyService.getUserHistory(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getOfflineLibrary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.offlineLibraryService.getOfflineLibrary(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
  
  deleteHistory = async (req: Request, res: Response, next: NextFunction) => {
      try {
          const { id } = req.params;
          const userId = req.user?.id || req.user?._id;
          await this.historyService.removeHistory(id, userId as string);
          res.status(200).json({ success: true, message: 'History record removed' });
      } catch (error) {
          next(error);
      }
  }
}
