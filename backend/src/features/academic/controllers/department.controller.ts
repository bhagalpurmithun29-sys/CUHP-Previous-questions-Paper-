import { Request, Response, NextFunction } from 'express';
import { departmentService } from '../services/department.service';

export class DepartmentController {
  async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await departmentService.getAllDepartments(req.query);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await departmentService.getDepartmentById(req.params.id);
      res.status(200).json({ success: true, data: department });
    } catch (error) { next(error); }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const department = await departmentService.createDepartment(req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(201).json({ success: true, data: department });
    } catch (error) { next(error); }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const department = await departmentService.updateDepartment(req.params.id, req.body, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: department });
    } catch (error) { next(error); }
  }

  async archiveDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const department = await departmentService.archiveDepartment(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: department, message: 'Department archived successfully' });
    } catch (error) { next(error); }
  }

  async restoreDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const department = await departmentService.restoreDepartment(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: department, message: 'Department restored successfully' });
    } catch (error) { next(error); }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const result = await departmentService.deleteDepartment(req.params.id, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, message: result.message });
    } catch (error) { next(error); }
  }
}

export const departmentController = new DepartmentController();
