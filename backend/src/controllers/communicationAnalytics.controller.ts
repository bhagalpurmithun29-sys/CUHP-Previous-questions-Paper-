import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { engagementAnalyticsService } from '../services/analytics/engagement.service';

export class CommunicationAnalyticsController {
  
  getOverview = catchAsync(async (req: Request, res: Response) => {
    const result = await engagementAnalyticsService.getOverview(req.query);
    res.status(200).json(new ApiResponse(200, result, 'Overview analytics retrieved'));
  });

  getNotifications = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, [], 'Notification analytics retrieved'));
  });

  getMessages = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, [], 'Message analytics retrieved'));
  });

  getAnnouncements = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, [], 'Announcement analytics retrieved'));
  });

  getTasks = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, [], 'Task analytics retrieved'));
  });

  getCalendar = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, [], 'Calendar analytics retrieved'));
  });

  exportData = catchAsync(async (req: Request, res: Response) => {
    // Generate CSV or PDF payload
    res.status(200).json(new ApiResponse(200, { link: 'mock-url' }, 'Export triggered'));
  });
}

export const communicationAnalyticsController = new CommunicationAnalyticsController();
