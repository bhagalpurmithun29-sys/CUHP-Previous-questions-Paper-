import { Request, Response, NextFunction } from 'express';
import { MarksService } from '../services/marks.service';

export class MarksController {
  private service = new MarksService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.service.processPaper(paperId, req.user!.id || req.user!._id as any);
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
      const data = await this.service.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.service.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  review = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const { action } = req.body;
      const data = await this.service.reviewAnalysis(paperId, action, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
