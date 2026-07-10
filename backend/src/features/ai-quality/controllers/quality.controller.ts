import { Request, Response, NextFunction } from 'express';
import { QualityService } from '../services/quality.service';

export class QualityController {
  private service = new QualityService();

  getQueue = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getQueue(req.query.status as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getMetrics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getMetrics();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  submitReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reviewId, status, notes, errorCategory, correctedOutput } = req.body;
      const data = await this.service.processReviewDecision(reviewId, { status, notes, errorCategory, correctedOutput }, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  requestReprocess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.requestReprocess(req.body.reviewId, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
