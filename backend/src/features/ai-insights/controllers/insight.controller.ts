import { Request, Response, NextFunction } from 'express';
import { InsightService } from '../services/insight.service';

export class InsightController {
  private service = new InsightService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const job = await this.service.processPaper(req.params.paperId, req.user?.id!);
      res.status(200).json({ success: true, data: job });
    } catch (error) { next(error); }
  };
  
  getInsights = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getInsights(req.params.paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
