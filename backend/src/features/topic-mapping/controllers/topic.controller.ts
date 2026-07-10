import { Request, Response, NextFunction } from 'express';
import { TopicService } from '../services/topic.service';

export class TopicController {
  private topicService = new TopicService();

  process = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.topicService.processPaper(paperId, req.user!.id || req.user!._id as any);
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
      const data = await this.topicService.reprocessPaper(paperId, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const data = await this.topicService.getStatus(paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getQuestionMapping = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const data = await this.topicService.getQuestionMapping(paperId, questionId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  review = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId, questionId } = req.params;
      const { action, manualOverrides } = req.body;
      const data = await this.topicService.reviewMapping(paperId, questionId, action, req.user!.id || req.user!._id as any, manualOverrides);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
