import { Request, Response } from 'express';
import { settingsService } from '../services/settings/settings.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class SettingsController {

  // Public: Used by frontend to configure themes, feature flags, or maintenance mode
  public getPublicSettings = catchAsync(async (req: Request, res: Response) => {
    const result = await settingsService.getAllSettings(false);
    res.status(200).json(new ApiResponse(200, result, 'Public settings retrieved'));
  });

  // Admin: Get all settings including sensitive ones
  public getAllSettings = catchAsync(async (req: Request, res: Response) => {
    const result = await settingsService.getAllSettings(true);
    res.status(200).json(new ApiResponse(200, result, 'All settings retrieved'));
  });

  public updateSetting = catchAsync(async (req: Request, res: Response) => {
    const { key, value } = req.body;
    // @ts-ignore
    const userId = req.user.id;
    
    const result = await settingsService.updateSetting(key, value, userId);
    res.status(200).json(new ApiResponse(200, result, 'Setting updated successfully'));
  });

  public exportSettings = catchAsync(async (req: Request, res: Response) => {
    const result = await settingsService.getAllSettings(true);
    // In production, might format to JSON blob or CSV stream
    res.status(200).json(new ApiResponse(200, result, 'Settings exported'));
  });

  public importSettings = catchAsync(async (req: Request, res: Response) => {
    const { settings } = req.body;
    // @ts-ignore
    const userId = req.user.id;
    
    const result = await settingsService.importSettings(settings, userId);
    res.status(200).json(new ApiResponse(200, result, 'Settings imported successfully'));
  });
}

export const settingsController = new SettingsController();
