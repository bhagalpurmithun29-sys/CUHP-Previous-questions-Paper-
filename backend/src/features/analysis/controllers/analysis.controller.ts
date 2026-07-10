import { Request, Response, NextFunction } from 'express';
import { AnalysisService } from '../services/analysis.service';

export class AnalysisController {
  private analysisService = new AnalysisService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.analysisService.processPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  reprocess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.analysisService.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.analysisService.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.analysisService.getResult(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.analysisService.getQueue();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
