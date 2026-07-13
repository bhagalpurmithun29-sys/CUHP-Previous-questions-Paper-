import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { compatibilityService } from '../services/device-diagnostics/compatibility.service';
import { platformHealthService } from '../services/device-diagnostics/platformHealth.service';

export class DiagnosticsController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    // Stub user specific metrics vs global aggregated metrics
    res.status(200).json(new ApiResponse(200, { platformHealthy: true }, 'Overview retrieved'));
  });

  getCapabilities = catchAsync(async (req: Request, res: Response) => {
    const result = await compatibilityService.getCompatibility();
    res.status(200).json(new ApiResponse(200, result, 'Capabilities retrieved'));
  });

  getCompatibility = catchAsync(async (req: Request, res: Response) => {
    const result = await compatibilityService.getCompatibility();
    res.status(200).json(new ApiResponse(200, result, 'Compatibility retrieved'));
  });

  getHealth = catchAsync(async (req: Request, res: Response) => {
    const result = await platformHealthService.getHealth();
    res.status(200).json(new ApiResponse(200, result, 'Health retrieved'));
  });
  
  reportCapabilities = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await compatibilityService.saveCapabilities(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Capabilities saved'));
  });
}

export const diagnosticsController = new DiagnosticsController();
