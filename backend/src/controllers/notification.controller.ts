import { Request, Response } from 'express';
import { notificationService } from '../services/notification/notification.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class NotificationController {

  public getNotifications = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await notificationService.getUserNotifications(userId, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Notifications retrieved'));
  });

  public getUnreadCount = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await notificationService.getUnreadCount(req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'Unread count retrieved'));
  });

  public markAsRead = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await notificationService.markAsRead(req.params.id, req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'Notification marked as read'));
  });

  public markAllAsRead = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await notificationService.markAllAsRead(req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'All notifications marked as read'));
  });

  public deleteNotification = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    await notificationService.deleteNotification(req.params.id, req.user.id);
    res.status(200).json(new ApiResponse(200, null, 'Notification deleted'));
  });
  
  public getPreferences = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await notificationService.getPreferences(req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'Preferences retrieved'));
  });
  
  public updatePreferences = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await notificationService.updatePreferences(req.user.id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Preferences updated'));
  });

  // Admin Only
  public broadcast = catchAsync(async (req: Request, res: Response) => {
    const { type, title, message, roleFilter } = req.body;
    const result = await notificationService.broadcast(type, title, message, roleFilter);
    res.status(200).json(new ApiResponse(200, result, 'Broadcast initiated'));
  });

}

export const notificationController = new NotificationController();
