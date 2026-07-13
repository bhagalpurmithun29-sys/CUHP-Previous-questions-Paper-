import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { pushSubscriptionService } from '../services/push/pushSubscription.service';
import { deliveryService } from '../services/push/delivery.service';

export class PushController {
  
  subscribe = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await pushSubscriptionService.subscribe(userId, req.body.subscription);
    res.status(200).json(new ApiResponse(200, result, 'Subscribed successfully'));
  });

  unsubscribe = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await pushSubscriptionService.unsubscribe(userId, req.body.endpoint);
    res.status(200).json(new ApiResponse(200, result, 'Unsubscribed successfully'));
  });

  getStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await pushSubscriptionService.getStatus(userId);
    res.status(200).json(new ApiResponse(200, result, 'Push status retrieved'));
  });

  testPush = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const payload = { title: 'Test Notification', body: 'This is a test deep link notification.', url: '/dashboard' };
    const result = await deliveryService.sendNotification(userId, payload);
    res.status(200).json(new ApiResponse(200, result, 'Test notification dispatched'));
  });

  sendPush = catchAsync(async (req: Request, res: Response) => {
    // Generic send for API consumers
    const { targetUserId, payload } = req.body;
    const result = await deliveryService.sendNotification(targetUserId, payload);
    res.status(200).json(new ApiResponse(200, result, 'Notification sent'));
  });
}

export const pushController = new PushController();
