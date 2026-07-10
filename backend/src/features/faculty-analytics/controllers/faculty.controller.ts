import { Request, Response, NextFunction } from 'express';
import { FacultyAnalyticsService } from '../services/faculty.service';

export class FacultyAnalyticsController {
  private service = new FacultyAnalyticsService();

  getOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getOverview(req.query, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getCurriculum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getCurriculumCoverage(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getAssessment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAssessmentQuality(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getBloom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getBloomDistribution(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getDifficulty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getDifficultyDistribution(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getComparison = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getComparison(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  exportReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.exportReport(req.body, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
