import { Request, Response, NextFunction } from 'express';
import { subjectService } from '../services/subject.service';

export class SubjectController {
  async getSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await subjectService.getAllSubjects(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getSubjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await subjectService.getSubjectById(req.params.id);
      res.status(200).json({ success: true, data: subject });
    } catch (error) { next(error); }
  }

  async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const subject = await subjectService.createSubject(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: subject });
    } catch (error) { next(error); }
  }

  async updateSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const subject = await subjectService.updateSubject(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: subject });
    } catch (error) { next(error); }
  }

  async archiveSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const subject = await subjectService.archiveSubject(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: subject, message: 'Subject archived successfully' });
    } catch (error) { next(error); }
  }

  async restoreSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const subject = await subjectService.restoreSubject(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: subject, message: 'Subject restored successfully' });
    } catch (error) { next(error); }
  }

  async deleteSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await subjectService.deleteSubject(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, message: result.message });
    } catch (error) { next(error); }
  }
}

export const subjectController = new SubjectController();
