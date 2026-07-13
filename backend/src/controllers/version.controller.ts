import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { versionService } from '../services/app/version.service';

export class VersionController {
  getVersion = catchAsync(async (req: Request, res: Response) => {
    const version = versionService.getAppVersion();
    res.status(200).json(new ApiResponse(200, version, 'App version retrieved successfully'));
  });

  getStatus = catchAsync(async (req: Request, res: Response) => {
    const status = versionService.getAppStatus();
    res.status(200).json(new ApiResponse(200, status, 'App status retrieved successfully'));
  });
}

export const versionController = new VersionController();
