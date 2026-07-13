import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { discussionService } from '../services/reviews/discussion.service';

export class ReviewController {
  
  getThreads = catchAsync(async (req: Request, res: Response) => {
    const result = await discussionService.getThreads(req.params.resourceId);
    res.status(200).json(new ApiResponse(200, result, 'Threads retrieved'));
  });

  createThread = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await discussionService.createThread(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Thread created'));
  });

  getComments = catchAsync(async (req: Request, res: Response) => {
    const result = await discussionService.getComments(req.params.threadId);
    res.status(200).json(new ApiResponse(200, result, 'Comments retrieved'));
  });

  addComment = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await discussionService.addComment(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Comment added'));
  });

  resolveThread = catchAsync(async (req: Request, res: Response) => {
    const result = await discussionService.resolveThread(req.params.threadId);
    res.status(200).json(new ApiResponse(200, result, 'Thread resolved'));
  });
}

export const reviewController = new ReviewController();
