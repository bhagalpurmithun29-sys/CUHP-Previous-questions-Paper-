import { Request, Response, NextFunction } from 'express';
import { uploadService } from '../services/upload.service';

export class UploadController {
  
  async submitUpload(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      // In a real app, req.file would be populated by multer
      const file = (req as any).file || null;
      
      const result = await uploadService.processUpload(req.body, file, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await uploadService.getUploadHistory(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const uploadController = new UploadController();
