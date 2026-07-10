import { Request, Response, NextFunction } from 'express';
import { OperationsService } from '../services/operations.service';

export class OperationsController {
  private service = new OperationsService();

  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getOverview(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getPipelineHealth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getPipelineHealth();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getModelMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getModelMetrics();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQualityMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getQualityMetrics();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getErrorAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getErrorAnalytics();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
