import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { reminderService } from '../services/reminders/reminder.service';

export class ReminderController {
  
  getReminders = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await reminderService.getUserReminders(userId);
    res.status(200).json(new ApiResponse(200, result, 'Reminders retrieved'));
  });

  createReminder = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const data = { ...req.body, creatorId: userId, targetUserId: userId }; // default target is creator for simple reminders
    const result = await reminderService.createReminder(data);
    res.status(201).json(new ApiResponse(201, result, 'Reminder created'));
  });

  snoozeReminder = catchAsync(async (req: Request, res: Response) => {
    const { minutes } = req.body;
    const result = await reminderService.snoozeReminder(req.params.id, minutes || 15);
    res.status(200).json(new ApiResponse(200, result, 'Reminder snoozed'));
  });

  completeReminder = catchAsync(async (req: Request, res: Response) => {
    const result = await reminderService.completeReminder(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Reminder completed'));
  });
}

export const reminderController = new ReminderController();
