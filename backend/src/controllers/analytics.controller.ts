import { Request, Response } from 'express';
import { analyticsService } from '../services/analytics/analytics.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class AnalyticsController {

  public getDashboardKPIs = catchAsync(async (req: Request, res: Response) => {
    const result = await analyticsService.getAdminDashboardKPIs();
    res.status(200).json(new ApiResponse(200, result, 'Dashboard KPIs retrieved successfully'));
  });

  public getUploads = catchAsync(async (req: Request, res: Response) => {
    const days = parseInt(req.query.days as string) || 30;
    const result = await analyticsService.getUploadTrends(days);
    res.status(200).json(new ApiResponse(200, result, 'Upload analytics retrieved'));
  });

  public getDownloads = catchAsync(async (req: Request, res: Response) => {
    const result = await analyticsService.getDownloadAnalytics();
    res.status(200).json(new ApiResponse(200, result, 'Download analytics retrieved'));
  });

  public getModerators = catchAsync(async (req: Request, res: Response) => {
    // If a moderator hits this, they only see their own stats. Admins see all.
    // @ts-ignore
    const role = req.user.role; // @ts-ignore
    const modId = role === 'MODERATOR' ? req.user.id : undefined;
    
    const result = await analyticsService.getModeratorAnalytics(modId);
    res.status(200).json(new ApiResponse(200, result, 'Moderator analytics retrieved'));
  });

  public exportReport = catchAsync(async (req: Request, res: Response) => {
    // Architecture placeholder for generating CSV/Excel/PDF
    // In production, this would queue a job and return an ID, or stream the CSV directly.
    const { reportType, format } = req.body;
    
    res.status(200).json(new ApiResponse(200, { 
      jobId: 'export_job_' + Date.now(),
      status: 'PROCESSING',
      message: `${format} export for ${reportType} has been queued.` 
    }, 'Export queued'));
  });

}

export const analyticsController = new AnalyticsController();
