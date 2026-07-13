import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { notificationService } from '../services/notifications/notification.service';
import { preferenceService } from '../services/notifications/preference.service';

export class NotificationController {
  
  getNotifications = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await notificationService.getNotifications(userId, req.query);
    res.status(200).json(new ApiResponse(200, result, 'Notifications retrieved'));
  });

  getUnreadCount = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await notificationService.getUnreadCount(userId);
    res.status(200).json(new ApiResponse(200, result, 'Unread count retrieved'));
  });

  markAsRead = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const result = await notificationService.markAsRead(userId, id);
    res.status(200).json(new ApiResponse(200, result, 'Notification marked as read'));
  });

  markAllAsRead = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await notificationService.markAllAsRead(userId);
    res.status(200).json(new ApiResponse(200, result, 'All notifications marked as read'));
  });

  deleteNotification = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    await notificationService.delete(userId, id);
    res.status(200).json(new ApiResponse(200, null, 'Notification deleted'));
  });

  archiveNotification = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const result = await notificationService.archive(userId, id);
    res.status(200).json(new ApiResponse(200, result, 'Notification archived'));
  });

  getPreferences = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await preferenceService.getPreferences(userId);
    res.status(200).json(new ApiResponse(200, result, 'Preferences retrieved'));
  });

  updatePreferences = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await preferenceService.updatePreferences(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Preferences updated'));
  });
}

export const notificationController = new NotificationController();
