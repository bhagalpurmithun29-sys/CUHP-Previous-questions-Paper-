import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { syncService } from '../services/offline/sync.service';
import { conflictResolutionService } from '../services/offline/conflictResolution.service';

export class SyncController {
  
  startSync = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await syncService.processSync(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Synchronization completed'));
  });

  getStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await syncService.getStatus(userId);
    res.status(200).json(new ApiResponse(200, result, 'Sync status retrieved'));
  });

  getHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await syncService.getHistory(userId);
    res.status(200).json(new ApiResponse(200, result, 'Sync history retrieved'));
  });

  retrySync = catchAsync(async (req: Request, res: Response) => {
    // Alias to startSync for simplicity in stub
    const userId = (req as any).user.id;
    const result = await syncService.processSync(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Synchronization retried'));
  });

  resolveConflicts = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await conflictResolutionService.resolveConflicts(userId, req.body.conflicts);
    res.status(200).json(new ApiResponse(200, result, 'Conflicts resolved manually'));
  });
}

export const syncController = new SyncController();
