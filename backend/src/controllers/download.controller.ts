import { Request, Response } from 'express';
import { downloadService } from '../services/download/download.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { DownloadStatus } from '../interfaces/download.interface';

export class DownloadController {

  public getDownloadUrl = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    // @ts-ignore
    const userRole = req.user?.role;
    
    const reqInfo = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      userIsAdmin: userRole === 'ADMIN',
      userIsModerator: userRole === 'MODERATOR'
    };

    const result = await downloadService.generateDownloadUrl(req.params.paperId, userId, reqInfo);
    res.status(200).json(new ApiResponse(200, result, 'Secure download URL generated'));
  });

  public confirmStatus = catchAsync(async (req: Request, res: Response) => {
    const { historyId, status } = req.body; // INITIATED, COMPLETED, FAILED, CANCELLED
    
    if (!Object.values(DownloadStatus).includes(status)) {
      return res.status(400).json(new ApiResponse(400, null, 'Invalid download status'));
    }

    await downloadService.confirmDownload(historyId, status);
    res.status(200).json(new ApiResponse(200, null, 'Download status updated'));
  });

  public getHistory = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await downloadService.getUserHistory(userId, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Download history retrieved'));
  });

  public getRecent = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await downloadService.getRecentDownloads(userId, limit);
    res.status(200).json(new ApiResponse(200, result, 'Recent downloads retrieved'));
  });

  public deleteHistoryRecord = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    
    await downloadService.deleteHistory(req.params.id, userId);
    res.status(200).json(new ApiResponse(200, null, 'History record deleted'));
  });
}

export const downloadController = new DownloadController();
