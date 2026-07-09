import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';

export class SearchController {
  async globalSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await searchService.globalSearch({ ...req.query, userId });
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async autocomplete(req: Request, res: Response, next: NextFunction) {
    try {
      const q = req.query.q as string;
      const result = await searchService.autocomplete(q);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await searchService.getHistory(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async clearHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await searchService.clearHistory(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getSavedSearches(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await searchService.getSavedSearches(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async saveSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await searchService.saveSearch(userId, req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const searchController = new SearchController();
