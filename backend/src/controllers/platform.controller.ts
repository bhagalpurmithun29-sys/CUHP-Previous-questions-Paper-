import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { healthCheckService } from '../services/platform/healthCheck.service';
import { workflowOrchestrationService } from '../services/platform/workflowOrchestration.service';
import { platformRepository } from '../repositories/platform.repository';

export class PlatformController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    // Stub overview
    const overview = { overallStatus: 'READY', uptime: process.uptime() };
    res.status(200).json(new ApiResponse(200, overview, 'Platform overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const result = await healthCheckService.getHealth();
    res.status(200).json(new ApiResponse(200, result, 'Platform health retrieved'));
  });

  getDependencies = catchAsync(async (req: Request, res: Response) => {
    const result = await healthCheckService.getDependencies();
    res.status(200).json(new ApiResponse(200, result, 'Dependencies retrieved'));
  });

  getWorkflows = catchAsync(async (req: Request, res: Response) => {
    const result = await workflowOrchestrationService.getWorkflows();
    res.status(200).json(new ApiResponse(200, result, 'Workflows retrieved'));
  });

  getReadiness = catchAsync(async (req: Request, res: Response) => {
    const result = await platformRepository.validatePlatform();
    res.status(200).json(new ApiResponse(200, result, 'Readiness validated'));
  });

  validatePlatform = catchAsync(async (req: Request, res: Response) => {
    const result = await platformRepository.validatePlatform();
    res.status(200).json(new ApiResponse(200, result, 'Platform validation triggered'));
  });
}

export const platformController = new PlatformController();
