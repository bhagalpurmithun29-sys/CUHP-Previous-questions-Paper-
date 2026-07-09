import { Request, Response } from 'express';
import { PreferencesService } from '../services/preferences.service';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class PreferencesController {
  static getPreferences = catchAsync(async (req: Request, res: Response) => {
    const data = await PreferencesService.getPreferences(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Preferences retrieved successfully', data });
  });

  static updatePreferences = catchAsync(async (req: Request, res: Response) => {
    // The DTO validation will be handled by a middleware ideally, assuming it is or we just pass req.body
    const data = await PreferencesService.updatePreferences(req.user!.id, req.body);
    sendResponse({ res, statusCode: 200, message: 'Preferences updated successfully', data });
  });

  static resetPreferences = catchAsync(async (req: Request, res: Response) => {
    const data = await PreferencesService.resetPreferences(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Preferences reset to defaults', data });
  });
}
