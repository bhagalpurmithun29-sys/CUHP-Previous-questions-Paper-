import { Request, Response } from 'express';
import { departmentService } from '../services/department.service';
import { ApiResponse } from '../utils/ApiResponse';
import { catchAsync } from '../utils/catchAsync';

export class DepartmentController {
  public createDepartment = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const department = await departmentService.createDepartment(req.body, userId);
    
    return res.status(201).json(new ApiResponse(201, department, 'Department created successfully'));
  });

  public getDepartments = catchAsync(async (req: Request, res: Response) => {
    const result = await departmentService.getDepartments(req.query);
    return res.status(200).json(new ApiResponse(200, result, 'Departments retrieved successfully'));
  });

  public getDepartmentsBySchool = catchAsync(async (req: Request, res: Response) => {
    const query = { ...req.query, schoolId: req.params.schoolId };
    const result = await departmentService.getDepartments(query);
    return res.status(200).json(new ApiResponse(200, result, 'Departments retrieved successfully'));
  });

  public getDepartmentById = catchAsync(async (req: Request, res: Response) => {
    const department = await departmentService.getDepartmentById(req.params.id);
    return res.status(200).json(new ApiResponse(200, department, 'Department retrieved successfully'));
  });

  public updateDepartment = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const department = await departmentService.updateDepartment(req.params.id, req.body, userId);
    
    return res.status(200).json(new ApiResponse(200, department, 'Department updated successfully'));
  });

  public deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    await departmentService.deleteDepartment(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, null, 'Department deleted successfully'));
  });
  
  public restoreDepartment = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user?.id;
    const department = await departmentService.restoreDepartment(req.params.id, userId);
    
    return res.status(200).json(new ApiResponse(200, department, 'Department restored successfully'));
  });
}

export const departmentController = new DepartmentController();
