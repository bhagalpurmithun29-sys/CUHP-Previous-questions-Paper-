import { Request, Response } from 'express';
import { viewerService } from '../services/viewer/viewer.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class ViewerController {

  public getSession = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    // @ts-ignore
    const userRole = req.user?.role;
    
    const reqInfo = {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      userIsAdmin: userRole === 'ADMIN',
      userIsModerator: userRole === 'MODERATOR'
    };

    const session = await viewerService.createSession(req.params.paperId, userId, reqInfo);
    res.status(200).json(new ApiResponse(200, session, 'Viewer session created successfully'));
  });

  public trackAnalytics = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    
    const result = await viewerService.trackAnalytics(req.params.paperId, req.body.sessionId, { ...req.body, userId });
    res.status(200).json(new ApiResponse(200, result, 'Analytics tracked successfully'));
  });

}

export const viewerController = new ViewerController();
