import { Request, Response } from 'express';
import { duplicateDetectionService } from '../services/processing/duplicate.service';
import { duplicateWorkerService } from '../services/queue/duplicate.queue';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class DuplicateController {
  
  public getReport = catchAsync(async (req: Request, res: Response) => {
    const report = await duplicateDetectionService.getReport(req.params.paperId);
    res.status(200).json(new ApiResponse(200, report, 'Duplicate report retrieved successfully'));
  });

  public recheck = catchAsync(async (req: Request, res: Response) => {
    // Manually trigger a re-check via the queue
    await duplicateWorkerService.addJob(req.body.paperId);
    res.status(202).json(new ApiResponse(202, null, 'Duplicate check queued successfully'));
  });

  public resolve = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const { reportId, action, notes } = req.body;
    
    const result = await duplicateDetectionService.resolveReport(reportId, action, userId, notes);
    res.status(200).json(new ApiResponse(200, result, 'Duplicate report resolved successfully'));
  });
}

export const duplicateController = new DuplicateController();
