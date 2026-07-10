import { Request, Response, NextFunction } from 'express';
import { PdfService } from '../services/pdf.service';
import { ReadingHistoryService } from '../services/reading-history.service';

export class PdfController {
  private pdfService: PdfService;
  private readingHistoryService: ReadingHistoryService;

  constructor() {
    this.pdfService = new PdfService();
    this.readingHistoryService = new ReadingHistoryService();
  }

  getViewerData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const userId = req.user?.id || req.user?._id;
      const data = await this.pdfService.getViewerData(userId as string, paperId);
      res.status(200).json({
        success: true,
        message: 'Viewer data retrieved successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const history = await this.readingHistoryService.getUserHistory(userId as string);
      res.status(200).json({
        success: true,
        message: 'Reading history retrieved successfully',
        data: history,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const userId = req.user?.id || req.user?._id;
      const { lastPageRead, progressPercentage, timeSpent } = req.body;

      const progress = await this.readingHistoryService.updateProgress(
        userId as string, 
        paperId, 
        { lastPageRead, progressPercentage, timeSpent: timeSpent || 0 }
      );
      
      res.status(200).json({
        success: true,
        message: 'Progress updated successfully',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  };

  addHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const { paperId, lastPageRead, progressPercentage, timeSpent } = req.body;

      const progress = await this.readingHistoryService.updateProgress(
        userId as string, 
        paperId, 
        { lastPageRead: lastPageRead || 1, progressPercentage: progressPercentage || 0, timeSpent: timeSpent || 0 }
      );
      
      res.status(201).json({
        success: true,
        message: 'History added successfully',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  };
  
  getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paperId } = req.params;
      const userId = req.user?.id || req.user?._id;
      const progress = await this.readingHistoryService.getProgress(userId as string, paperId);
      
      res.status(200).json({
        success: true,
        message: 'Progress retrieved successfully',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  };
}
