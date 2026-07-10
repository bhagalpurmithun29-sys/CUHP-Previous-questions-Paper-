import { Request, Response, NextFunction } from 'express';
import { BloomService } from '../services/bloom.service';

export class BloomController {
  private bloomService = new BloomService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.bloomService.processPaper(paperId, req.user!.id || req.user!._id as any);
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
      const data = await this.bloomService.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.bloomService.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQuestionClassification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const data = await this.bloomService.getQuestionClassification(paperId, questionId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  review = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const { action, manualOverrideLevel } = req.body;
      const data = await this.bloomService.reviewClassification(paperId, questionId, action, req.user!.id || req.user!._id as any, manualOverrideLevel);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
