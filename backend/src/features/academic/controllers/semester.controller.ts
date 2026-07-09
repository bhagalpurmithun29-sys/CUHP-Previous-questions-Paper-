import { Request, Response, NextFunction } from 'express';
import { semesterService } from '../services/semester.service';

export class SemesterController {
  async getSemesters(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await semesterService.getAllSemesters(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getSemesterById(req: Request, res: Response, next: NextFunction) {
    try {
      const semester = await semesterService.getSemesterById(req.params.id);
      res.status(200).json({ success: true, data: semester });
    } catch (error) { next(error); }
  }

  async createSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const semester = await semesterService.createSemester(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: semester });
    } catch (error) { next(error); }
  }

  async updateSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const semester = await semesterService.updateSemester(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: semester });
    } catch (error) { next(error); }
  }

  async archiveSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const semester = await semesterService.archiveSemester(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: semester, message: 'Semester archived successfully' });
    } catch (error) { next(error); }
  }

  async restoreSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const semester = await semesterService.restoreSemester(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: semester, message: 'Semester restored successfully' });
    } catch (error) { next(error); }
  }

  async deleteSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await semesterService.deleteSemester(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, message: result.message });
    } catch (error) { next(error); }
  }
}

export const semesterController = new SemesterController();
