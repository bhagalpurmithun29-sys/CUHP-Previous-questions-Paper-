import { Request, Response, NextFunction } from 'express';
import { paperService } from '../services/paper.service';

export class PaperController {
  
  async createPaper(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await paperService.createPaper(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getPapers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paperService.getPapers(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getPaperById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await paperService.getPaperById(req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async updatePaper(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await paperService.updatePaper(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async setStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const { status } = req.body;
      const result = await paperService.setStatus(req.params.id, status, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async deletePaper(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      await paperService.softDelete(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(204).send();
    } catch (error) { next(error); }
  }
}

export const paperController = new PaperController();
