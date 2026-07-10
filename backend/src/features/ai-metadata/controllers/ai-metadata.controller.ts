import { Request, Response, NextFunction } from 'express';
import { AIMetadataService } from '../services/ai-metadata.service';
import { SuggestionEngine } from '../services/suggestion-engine';
import { ReviewWorkflowService } from '../services/review-workflow.service';

export class AIMetadataController {
  private aiService = new AIMetadataService();
  private suggestionEngine = new SuggestionEngine();
  private reviewService = new ReviewWorkflowService();

  processMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.aiService.queuePaperForExtraction(req.params.paperId);
      setTimeout(() => this.suggestionEngine.processPendingJobs(), 100);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.aiService.getMetadataStatus(req.params.paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  reviewMetadata = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.reviewService.reviewMetadata(req.params.paperId, req.body.acceptedSuggestions, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.aiService.getStats();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  }
}
