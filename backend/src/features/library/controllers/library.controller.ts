import { Request, Response, NextFunction } from 'express';
import { LibraryService } from '../services/library.service';
import { RecommendationService } from '../services/recommendation.service';

export class LibraryController {
  private libraryService = new LibraryService();
  private recommendationService = new RecommendationService();

  getLibraryOverview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.libraryService.getLibraryOverview(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getRecent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.libraryService.getRecent(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getSaved = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.libraryService.getSaved(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getDownloads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.libraryService.getDownloads(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.libraryService.getProgress(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.recommendationService.getRecommendations(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
