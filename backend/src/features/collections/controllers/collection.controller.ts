import { Request, Response, NextFunction } from 'express';
import { CollectionService } from '../services/collection.service';

export class CollectionController {
  private collectionService = new CollectionService();

  getCollections = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.collectionService.getCollections(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.collectionService.getCollectionById(userId as string, req.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  createCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.collectionService.createCollection(userId as string, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  };

  updateCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.collectionService.updateCollection(userId as string, req.params.id, req.body);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.collectionService.deleteCollection(userId as string, req.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
