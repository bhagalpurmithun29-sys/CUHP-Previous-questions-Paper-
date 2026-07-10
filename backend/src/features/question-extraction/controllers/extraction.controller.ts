import { Request, Response, NextFunction } from 'express';
import { ExtractionService } from '../services/extraction.service';

export class ExtractionController {
  private extractionService = new ExtractionService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.extractionService.processPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  reprocess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.extractionService.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.extractionService.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.extractionService.getQuestions(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  review = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const { action } = req.body; // APPROVE or REJECT
      const data = await this.extractionService.reviewExtraction(paperId, action, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.extractionService.getQueue();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
