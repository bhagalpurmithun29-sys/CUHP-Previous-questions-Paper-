import { Request, Response, NextFunction } from 'express';
import { DifficultyService } from '../services/difficulty.service';

export class DifficultyController {
  private diffService = new DifficultyService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.diffService.processPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error: any) { 
        if (error.message.includes('Extraction must be completed')) {
            return res.status(400).json({ success: false, message: error.message });
        }
        next(error); 
    }
  };

  reprocess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.diffService.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.diffService.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQuestionAnalysis = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const data = await this.diffService.getQuestionAnalysis(paperId, questionId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  review = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const { action, manualOverrides } = req.body;
      const data = await this.diffService.reviewAnalysis(paperId, questionId, action, req.user!.id || req.user!._id as any, manualOverrides);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
