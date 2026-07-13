import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { telemetryService } from '../services/mobile-telemetry/telemetry.service';
import { synchronizationAnalyticsService } from '../services/mobile-telemetry/synchronizationAnalytics.service';

export class MobileTelemetryController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await telemetryService.getOverview();
    res.status(200).json(new ApiResponse(200, result, 'Telemetry overview retrieved'));
  });

  getSync = catchAsync(async (req: Request, res: Response) => {
    const result = await synchronizationAnalyticsService.getSyncAnalytics();
    res.status(200).json(new ApiResponse(200, result, 'Sync analytics retrieved'));
  });

  getStorage = catchAsync(async (req: Request, res: Response) => {
    const result = await telemetryService.getStorageAnalytics();
    res.status(200).json(new ApiResponse(200, result, 'Storage analytics retrieved'));
  });

  getNetwork = catchAsync(async (req: Request, res: Response) => {
    const result = await telemetryService.getNetworkQuality();
    res.status(200).json(new ApiResponse(200, result, 'Network analytics retrieved'));
  });

  exportReport = catchAsync(async (req: Request, res: Response) => {
    // Generate CSV or JSON export
    res.status(200).json(new ApiResponse(200, { downloadUrl: '/temp/report.csv' }, 'Report exported'));
  });
}

export const mobileTelemetryController = new MobileTelemetryController();
