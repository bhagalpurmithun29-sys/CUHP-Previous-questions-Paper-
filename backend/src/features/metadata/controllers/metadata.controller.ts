import { Request, Response, NextFunction } from 'express';
import { metadataService } from '../services/metadata.service';

export class MetadataController {
  
  async getMetadata(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await metadataService.getMetadata(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async updateMetadata(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await metadataService.updateMetadata(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await metadataService.getHistory(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const metadataController = new MetadataController();
