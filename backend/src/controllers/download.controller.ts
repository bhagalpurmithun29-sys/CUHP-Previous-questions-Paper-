import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { downloadService } from '../services/offline-library/download.service';

export class DownloadController {
  
  getDownloads = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.getActiveDownloads(userId);
    res.status(200).json(new ApiResponse(200, result, 'Active downloads retrieved'));
  });

  startDownload = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.startDownload(userId, req.body.resourceId);
    res.status(200).json(new ApiResponse(200, result, 'Download started'));
  });

  pauseDownload = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.pauseDownload(userId, req.body.downloadId);
    res.status(200).json(new ApiResponse(200, result, 'Download paused'));
  });

  resumeDownload = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.resumeDownload(userId, req.body.downloadId);
    res.status(200).json(new ApiResponse(200, result, 'Download resumed'));
  });

  cancelDownload = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.cancelDownload(userId, req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Download cancelled'));
  });

  getStorage = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await downloadService.getStorage(userId);
    res.status(200).json(new ApiResponse(200, result, 'Storage quota retrieved'));
  });
}

export const downloadController = new DownloadController();
