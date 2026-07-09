import { Request, Response, NextFunction } from 'express';
import { hierarchyService } from '../services/hierarchy.service';

export class HierarchyController {
  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const { parentId, type } = req.query;
      const nodes = await hierarchyService.getTree(parentId as string, type as string);
      res.status(200).json({ success: true, data: nodes });
    } catch (error) { next(error); }
  }

  async getBreadcrumbs(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, type } = req.query;
      if (!id || !type) {
        return res.status(400).json({ success: false, message: 'id and type are required' });
      }
      const breadcrumbs = await hierarchyService.getBreadcrumbs(id as string, type as string);
      res.status(200).json({ success: true, data: breadcrumbs });
    } catch (error) { next(error); }
  }

  async getRecent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const recent = await hierarchyService.getRecent(userId);
      res.status(200).json({ success: true, data: recent });
    } catch (error) { next(error); }
  }

  async getFavorites(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const favorites = await hierarchyService.getFavorites(userId);
      res.status(200).json({ success: true, data: favorites });
    } catch (error) { next(error); }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const { nodeId, type } = req.body;
      await hierarchyService.addFavorite(userId, nodeId, type);
      res.status(200).json({ success: true, message: 'Added to favorites' });
    } catch (error) { next(error); }
  }

  async removeFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      await hierarchyService.removeFavorite(userId, req.params.id);
      res.status(200).json({ success: true, message: 'Removed from favorites' });
    } catch (error) { next(error); }
  }
}

export const hierarchyController = new HierarchyController();
