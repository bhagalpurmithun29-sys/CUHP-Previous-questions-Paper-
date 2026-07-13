import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { usageAnalyticsService } from '../services/aiAnalytics/usageAnalytics.service';
import { engagementAnalyticsService } from '../services/aiAnalytics/engagementAnalytics.service';
import { executiveKPIService } from '../services/aiAnalytics/executiveKPI.service';
import { reportingService } from '../services/aiAnalytics/reporting.service';

export class AIAnalyticsController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const overview = await usageAnalyticsService.getOverview(filters);
    const engagement = await engagementAnalyticsService.getSessionMetrics();
    res.status(200).json(new ApiResponse(200, { ...overview, ...engagement }, 'Overview retrieved'));
  });

  getFeatures = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const features = await usageAnalyticsService.getFeatures(filters);
    res.status(200).json(new ApiResponse(200, features, 'Feature adoption retrieved'));
  });

  getRoles = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const roles = await usageAnalyticsService.getRoles(filters);
    res.status(200).json(new ApiResponse(200, roles, 'Role distribution retrieved'));
  });

  getDepartments = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const departments = await usageAnalyticsService.getDepartments(filters);
    res.status(200).json(new ApiResponse(200, departments, 'Department stats retrieved'));
  });

  getEducationKPIs = catchAsync(async (req: Request, res: Response) => {
    const kpis = await executiveKPIService.getKPIs();
    res.status(200).json(new ApiResponse(200, kpis, 'Educational KPIs retrieved'));
  });

  exportReport = catchAsync(async (req: Request, res: Response) => {
    const { type, filters } = req.body;
    const report = await reportingService.generateReport(type, filters);
    res.status(200).json(new ApiResponse(200, report, 'Report generation triggered'));
  });
}

export const aiAnalyticsController = new AIAnalyticsController();
