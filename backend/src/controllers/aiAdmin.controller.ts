import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { platformOverviewService } from '../services/aiAdmin/platformOverview.service';
import { configurationService } from '../services/aiAdmin/configuration.service';
import { healthMonitoringService } from '../services/aiAdmin/healthMonitoring.service';
import { alertService } from '../services/aiAdmin/alert.service';

export class AIAdminController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const overview = await platformOverviewService.getOverview();
    res.status(200).json(new ApiResponse(200, overview, 'Platform overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const health = await healthMonitoringService.getHealthStatus();
    res.status(200).json(new ApiResponse(200, health, 'Health status retrieved'));
  });

  getAlerts = catchAsync(async (req: Request, res: Response) => {
    const alerts = await alertService.getActiveAlerts();
    res.status(200).json(new ApiResponse(200, alerts, 'Active alerts retrieved'));
  });

  acknowledgeAlert = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const alert = await alertService.acknowledgeAlert(id, userId);
    res.status(200).json(new ApiResponse(200, alert, 'Alert acknowledged'));
  });

  getConfiguration = catchAsync(async (req: Request, res: Response) => {
    const config = await configurationService.getConfig();
    res.status(200).json(new ApiResponse(200, config, 'Configuration retrieved'));
  });

  updateConfiguration = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const config = await configurationService.updateConfig(req.body, userId);
    res.status(200).json(new ApiResponse(200, config, 'Configuration updated'));
  });
}

export const aiAdminController = new AIAdminController();
