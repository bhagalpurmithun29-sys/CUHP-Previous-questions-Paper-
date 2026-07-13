import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { eventService } from '../services/calendar/event.service';
import { icsService } from '../services/calendar/ics.service';
import { calendarRepository } from '../repositories/calendar.repository';

export class CalendarController {
  
  getEvents = catchAsync(async (req: Request, res: Response) => {
    const result = await eventService.getEvents((req as any).user, req.query);
    res.status(200).json(new ApiResponse(200, result, 'Events retrieved'));
  });

  getEventById = catchAsync(async (req: Request, res: Response) => {
    const result = await calendarRepository.getEventById(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Event retrieved'));
  });

  createEvent = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await eventService.createEvent(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Event created'));
  });

  updateEvent = catchAsync(async (req: Request, res: Response) => {
    const result = await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Event updated'));
  });

  deleteEvent = catchAsync(async (req: Request, res: Response) => {
    await eventService.deleteEvent(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Event deleted'));
  });

  exportIcs = catchAsync(async (req: Request, res: Response) => {
    const events = await eventService.getEvents((req as any).user, req.query);
    const icsContent = await icsService.exportEvents(events);
    
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"');
    res.send(icsContent);
  });
}

export const calendarController = new CalendarController();
