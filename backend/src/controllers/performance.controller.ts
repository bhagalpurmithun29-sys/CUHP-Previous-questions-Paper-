import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { performanceMetricsService } from '../services/performance/performanceMetrics.service';

export class PerformanceController {
  
  getMetrics = catchAsync(async (req: Request, res: Response) => {
    const result = await performanceMetricsService.getMetrics();
    res.status(200).json(new ApiResponse(200, result, 'Metrics retrieved'));
  });

  getSummary = catchAsync(async (req: Request, res: Response) => {
    const result = await performanceMetricsService.getSummary();
    res.status(200).json(new ApiResponse(200, result, 'Summary retrieved'));
  });
}

export const performanceController = new PerformanceController();
