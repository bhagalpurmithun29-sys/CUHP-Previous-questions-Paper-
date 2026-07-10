import { Request, Response, NextFunction } from 'express';
import { RepositoryAnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  private analyticsService = new RepositoryAnalyticsService();

  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.analyticsService.getOverviewData();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getUploads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.analyticsService.getUploadData();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getOcr = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.analyticsService.getOcrData();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getAi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.analyticsService.getAiData();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
