import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { operationsMonitoringService } from '../services/mobile-operations/operationsMonitoring.service';
import { incidentManagementService } from '../services/mobile-operations/incidentManagement.service';
import { platformHealthService } from '../services/mobile-operations/platformHealth.service';

export class MobileOperationsController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await operationsMonitoringService.getOverview();
    res.status(200).json(new ApiResponse(200, result, 'Operations overview retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const result = await platformHealthService.getHealth();
    res.status(200).json(new ApiResponse(200, result, 'Service health retrieved'));
  });

  getIncidents = catchAsync(async (req: Request, res: Response) => {
    const result = await incidentManagementService.getIncidents();
    res.status(200).json(new ApiResponse(200, result, 'Incidents retrieved'));
  });

  createIncident = catchAsync(async (req: Request, res: Response) => {
    const result = await incidentManagementService.createIncident(req.body);
    res.status(201).json(new ApiResponse(201, result, 'Incident created'));
  });

  getReports = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, { downloadUrl: '/temp/operations-report.pdf' }, 'Report generated'));
  });
}

export const mobileOperationsController = new MobileOperationsController();
