import { Request, Response, NextFunction } from 'express';
import { courseService } from '../services/course.service';

export class CourseController {
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await courseService.getAllCourses(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getCourseById(req.params.id);
      res.status(200).json({ success: true, data: course });
    } catch (error) { next(error); }
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const course = await courseService.createCourse(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: course });
    } catch (error) { next(error); }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const course = await courseService.updateCourse(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: course });
    } catch (error) { next(error); }
  }

  async archiveCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const course = await courseService.archiveCourse(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: course, message: 'Course archived successfully' });
    } catch (error) { next(error); }
  }

  async restoreCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const course = await courseService.restoreCourse(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: course, message: 'Course restored successfully' });
    } catch (error) { next(error); }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await courseService.deleteCourse(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, message: result.message });
    } catch (error) { next(error); }
  }
}

export const courseController = new CourseController();
