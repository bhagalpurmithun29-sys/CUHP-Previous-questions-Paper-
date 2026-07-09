import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

const adminService = new AdminService();

export const getDashboardStatistics = catchAsync(async (req: Request, res: Response) => {
  const stats = await adminService.getStatistics();
  res.status(200).json(new ApiResponse(200, stats, 'Dashboard statistics retrieved successfully'));
});

export const getAcademicHierarchy = catchAsync(async (req: Request, res: Response) => {
  const hierarchy = await adminService.getAcademicHierarchy();
  res.status(200).json(new ApiResponse(200, hierarchy, 'Academic hierarchy retrieved successfully'));
});

export const getAuditLogs = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  
  const data = await adminService.getAuditLogs(page, limit);
  res.status(200).json(new ApiResponse(200, data, 'Audit logs retrieved successfully'));
});

export const getValidationReport = catchAsync(async (req: Request, res: Response) => {
  const report = await adminService.getValidationReport();
  res.status(200).json(new ApiResponse(200, report, 'Validation report generated successfully'));
});
