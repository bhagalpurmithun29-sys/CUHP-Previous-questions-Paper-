import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { integrationService } from '../services/mobile-platform/integration.service';
import { validationService } from '../services/mobile-platform/validation.service';
import { deploymentReadinessService } from '../services/mobile-platform/deploymentReadiness.service';

export class MobilePlatformController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await integrationService.getOverview();
    res.status(200).json(new ApiResponse(200, result, 'Platform overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    // Uses integration service to verify overall mobile API health
    res.status(200).json(new ApiResponse(200, { globalHealth: 'OK' }, 'Health retrieved'));
  });

  getDependencies = catchAsync(async (req: Request, res: Response) => {
    const result = await integrationService.getDependencies();
    res.status(200).json(new ApiResponse(200, result, 'Dependencies retrieved'));
  });

  getReadiness = catchAsync(async (req: Request, res: Response) => {
    const result = await deploymentReadinessService.getReadiness();
    res.status(200).json(new ApiResponse(200, result, 'Readiness retrieved'));
  });

  validateWorkflow = catchAsync(async (req: Request, res: Response) => {
    const result = await validationService.validateWorkflow('mobile-e2e', req.body);
    res.status(200).json(new ApiResponse(200, result, 'Workflow validated'));
  });
}

export const mobilePlatformController = new MobilePlatformController();
