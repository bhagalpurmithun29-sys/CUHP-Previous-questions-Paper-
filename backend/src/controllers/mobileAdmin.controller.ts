import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { remoteConfigurationService } from '../services/mobile-admin/remoteConfiguration.service';
import { mobilePolicyService } from '../services/mobile-admin/mobilePolicy.service';
import { fleetMonitoringService } from '../services/mobile-admin/fleetMonitoring.service';

export class MobileAdminController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const fleet = await fleetMonitoringService.getFleetOverview();
    const config = await remoteConfigurationService.getConfiguration();
    res.status(200).json(new ApiResponse(200, { fleet, config }, 'Overview retrieved'));
  });

  getFleet = catchAsync(async (req: Request, res: Response) => {
    const result = await fleetMonitoringService.getFleetOverview();
    res.status(200).json(new ApiResponse(200, result, 'Fleet data retrieved'));
  });

  getDeployment = catchAsync(async (req: Request, res: Response) => {
    // Stub for deployment progress details
    res.status(200).json(new ApiResponse(200, { progress: 85, target: '1.2.0' }, 'Deployment retrieved'));
  });

  updateConfiguration = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await remoteConfigurationService.updateConfiguration(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Configuration updated'));
  });

  updatePolicies = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await mobilePolicyService.updatePolicies(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Policies updated'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const result = await fleetMonitoringService.getPlatformHealth();
    res.status(200).json(new ApiResponse(200, result, 'Health retrieved'));
  });
}

export const mobileAdminController = new MobileAdminController();
