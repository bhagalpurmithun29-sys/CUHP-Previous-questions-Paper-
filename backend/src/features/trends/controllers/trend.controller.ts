import { Request, Response, NextFunction } from 'express';
import { TrendService } from '../services/trend.service';

export class TrendController {
  private service = new TrendService();

  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getOverview(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getTopicTrends(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  getBloom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getBloomTrends(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getDifficulty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getDifficultyTrends(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
