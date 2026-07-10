import { Request, Response, NextFunction } from 'express';
import { OcrQueueService } from '../services/ocr-queue.service';
import { OcrReviewService } from '../services/ocr-review.service';
import { OcrService } from '../services/ocr.service';
import { OcrWorker } from '../services/ocr-worker';

export class OcrController {
  private queueService = new OcrQueueService();
  private reviewService = new OcrReviewService();
  private ocrService = new OcrService();
  private worker = new OcrWorker();

  startOcr = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.queueService.queuePaperForOcr(req.params.paperId);
      setTimeout(() => this.worker.processPendingJobs(), 100);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getOcrStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.queueService.getQueueStatus(req.params.paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getOcrText = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.ocrService.getOcrText(req.params.paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  reviewOcr = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.reviewService.reviewOcr(req.params.paperId, req.body.correctedText, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  getOcrStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.ocrService.getOcrStats();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  }
}
