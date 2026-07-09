import { Request, Response, NextFunction } from 'express';
import { schoolService } from '../services/school.service';

export class SchoolController {
  async getSchools(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await schoolService.getAllSchools(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getSchoolById(req: Request, res: Response, next: NextFunction) {
    try {
      const school = await schoolService.getSchoolById(req.params.id);
      res.status(200).json({ success: true, data: school });
    } catch (error) { next(error); }
  }

  async createSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const school = await schoolService.createSchool(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: school });
    } catch (error) { next(error); }
  }

  async updateSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const school = await schoolService.updateSchool(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: school });
    } catch (error) { next(error); }
  }

  async archiveSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const school = await schoolService.archiveSchool(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: school, message: 'School archived successfully' });
    } catch (error) { next(error); }
  }

  async restoreSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const school = await schoolService.restoreSchool(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: school, message: 'School restored successfully' });
    } catch (error) { next(error); }
  }

  async deleteSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await schoolService.deleteSchool(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, message: result.message });
    } catch (error) { next(error); }
  }
}

export const schoolController = new SchoolController();
