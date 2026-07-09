import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';
import { AuthAuditLog } from '../../../models/authAuditLog.model';

export class AnalyticsController {
  
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analyticsService.getOverview();
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getGrowth(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analyticsService.getGrowth();
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getDataQuality(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analyticsService.getDataQuality();
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getDistribution(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await analyticsService.getDistribution();
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async generateReport(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await analyticsService.generateReport(req.body);

      await AuthAuditLog.create({
        userId,
        action: 'REPORT_GENERATION' as any,
        ipAddress: req.ip || '',
        userAgent: req.get('User-Agent') || '',
        metadata: { reportType: 'ACADEMIC_ANALYTICS' }
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const analyticsController = new AnalyticsController();
