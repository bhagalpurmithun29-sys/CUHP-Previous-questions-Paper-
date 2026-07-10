import { Request, Response, NextFunction } from 'express';
import { StudentInsightsService } from '../services/student.service';

export class StudentInsightsController {
  private service = new StudentInsightsService();

  getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getDashboard(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getTopics(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getRevision = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getRevision(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getProfile(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getRecommendations(req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
