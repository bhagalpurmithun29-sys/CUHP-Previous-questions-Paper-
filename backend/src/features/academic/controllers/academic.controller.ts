import { Request, Response, NextFunction } from 'express';
import { academicService } from '../services/academic.service';

export class AcademicController {
  
  // Dashboard & Overview
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await academicService.getAcademicOverview();
      res.status(200).json({ success: true, data: stats });
    } catch (error) { next(error); }
  }

  async getTree(req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await academicService.getAcademicTree();
      res.status(200).json({ success: true, data: tree });
    } catch (error) { next(error); }
  }

  // School
  async getSchools(req: Request, res: Response, next: NextFunction) {
    try {
      const schools = await academicService.getSchools();
      res.status(200).json({ success: true, data: schools });
    } catch (error) { next(error); }
  }

  async createSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const school = await academicService.createSchool(req.body, (req as any).user._id);
      res.status(201).json({ success: true, data: school });
    } catch (error) { next(error); }
  }

  // Department
  async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await academicService.getDepartments(req.query.schoolId as string);
      res.status(200).json({ success: true, data: departments });
    } catch (error) { next(error); }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await academicService.createDepartment(req.body, (req as any).user._id);
      res.status(201).json({ success: true, data: department });
    } catch (error) { next(error); }
  }

  // Course
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await academicService.getCourses(req.query.departmentId as string);
      res.status(200).json({ success: true, data: courses });
    } catch (error) { next(error); }
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await academicService.createCourse(req.body, (req as any).user._id);
      res.status(201).json({ success: true, data: course });
    } catch (error) { next(error); }
  }

  // Semester
  async getSemesters(req: Request, res: Response, next: NextFunction) {
    try {
      const semesters = await academicService.getSemesters(req.query.courseId as string);
      res.status(200).json({ success: true, data: semesters });
    } catch (error) { next(error); }
  }

  async createSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const semester = await academicService.createSemester(req.body, (req as any).user._id);
      res.status(201).json({ success: true, data: semester });
    } catch (error) { next(error); }
  }

  // Subject
  async getSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const subjects = await academicService.getSubjects(req.query.semesterId as string);
      res.status(200).json({ success: true, data: subjects });
    } catch (error) { next(error); }
  }

  async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await academicService.createSubject(req.body, (req as any).user._id);
      res.status(201).json({ success: true, data: subject });
    } catch (error) { next(error); }
  }
}

export const academicController = new AcademicController();
