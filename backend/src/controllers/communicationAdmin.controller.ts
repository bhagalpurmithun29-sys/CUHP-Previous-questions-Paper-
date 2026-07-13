import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { operationsService } from '../services/admin/operations.service';

export class CommunicationAdminController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await operationsService.getOverview();
    res.status(200).json(new ApiResponse(200, result, 'Operations overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { status: 'HEALTHY' }, 'Health check passed'));
  });

  getAlerts = catchAsync(async (req: Request, res: Response) => {
    const result = await operationsService.getAlerts();
    res.status(200).json(new ApiResponse(200, result, 'Alerts retrieved'));
  });

  getConfiguration = catchAsync(async (req: Request, res: Response) => {
    const result = await operationsService.getConfiguration();
    res.status(200).json(new ApiResponse(200, result, 'Configuration retrieved'));
  });

  updateConfiguration = catchAsync(async (req: Request, res: Response) => {
    const result = await operationsService.updateConfiguration(req.body);
    res.status(200).json(new ApiResponse(200, result, 'Configuration updated'));
  });

  exportData = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { link: 'mock-download-link' }, 'Export triggered'));
  });
}

export const communicationAdminController = new CommunicationAdminController();
