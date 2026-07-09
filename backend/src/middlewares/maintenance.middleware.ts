import { Request, Response, NextFunction } from 'express';
import { settingsService } from '../services/settings/settings.service';
import { AppError } from '../utils/AppError';

export const checkMaintenanceMode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isMaintenance = await settingsService.getSettingValue('maintenance_mode');
    
    if (isMaintenance) {
      // Allow admins to bypass maintenance mode if they are authenticated
      // (This requires careful placement in the middleware stack *after* auth if we want bypass)
      // For now, global block unless hitting /api/settings/public
      
      if (!req.path.startsWith('/api/settings/public')) {
         return next(new AppError('System is currently undergoing maintenance. Please try again later.', 503));
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
