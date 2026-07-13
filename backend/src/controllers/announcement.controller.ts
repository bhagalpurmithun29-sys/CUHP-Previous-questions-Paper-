import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { announcementService } from '../services/announcements/announcement.service';
import { publishingService } from '../services/announcements/publishing.service';
import { acknowledgementService } from '../services/announcements/acknowledgement.service';

export class AnnouncementController {
  
  getAnnouncements = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await announcementService.getAnnouncements(user, req.query);
    res.status(200).json(new ApiResponse(200, result, 'Announcements retrieved'));
  });

  getAnnouncementById = catchAsync(async (req: Request, res: Response) => {
    const result = await announcementService.getAnnouncementById(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Announcement retrieved'));
  });

  createAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await announcementService.createAnnouncement(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Announcement created'));
  });

  updateAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const result = await announcementService.updateAnnouncement(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Announcement updated'));
  });

  deleteAnnouncement = catchAsync(async (req: Request, res: Response) => {
    await announcementService.deleteAnnouncement(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Announcement deleted'));
  });

  publishAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const result = await publishingService.publish(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Announcement published'));
  });

  acknowledgeAnnouncement = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await acknowledgementService.acknowledge(req.params.id, userId);
    res.status(200).json(new ApiResponse(200, result, 'Announcement acknowledged'));
  });
}

export const announcementController = new AnnouncementController();
