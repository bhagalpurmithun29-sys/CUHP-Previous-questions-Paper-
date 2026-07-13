import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { workflowOrchestrationService } from '../services/platform/workflowOrchestration.service';
import { integrationValidationService } from '../services/platform/integrationValidation.service';
import { healthCheckService } from '../services/platform/healthCheck.service';
import { featureFlagService } from '../services/platform/featureFlag.service';
import { deploymentReadinessService } from '../services/platform/deploymentReadiness.service';

export class PlatformController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const orchestration = await workflowOrchestrationService.getOrchestrationOverview();
    const flags = await featureFlagService.getFlags();
    res.status(200).json(new ApiResponse(200, { orchestration, flags }, 'Platform overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const health = await healthCheckService.getSystemHealth();
    res.status(200).json(new ApiResponse(200, health, 'System health retrieved'));
  });

  getDependencies = catchAsync(async (req: Request, res: Response) => {
    const dependencies = await integrationValidationService.getDependencies();
    res.status(200).json(new ApiResponse(200, dependencies, 'Dependencies retrieved'));
  });

  getWorkflows = catchAsync(async (req: Request, res: Response) => {
    const workflows = await workflowOrchestrationService.getWorkflows();
    res.status(200).json(new ApiResponse(200, workflows, 'Workflows retrieved'));
  });

  getReadiness = catchAsync(async (req: Request, res: Response) => {
    const readiness = await deploymentReadinessService.getReadinessStatus();
    res.status(200).json(new ApiResponse(200, readiness, 'Readiness status retrieved'));
  });

  updateFeatureFlag = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { flag, enabled } = req.body;
    const result = await featureFlagService.toggleFlag(flag, enabled, userId);
    res.status(200).json(new ApiResponse(200, result, 'Feature flag updated'));
  });

  runValidation = catchAsync(async (req: Request, res: Response) => {
    // Triggers full system validation pipeline
    const readiness = await deploymentReadinessService.getReadinessStatus();
    res.status(200).json(new ApiResponse(200, readiness, 'Platform validation complete'));
  });
}

export const platformController = new PlatformController();
