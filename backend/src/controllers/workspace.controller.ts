import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { workspaceService } from '../services/workspaces/workspace.service';

export class WorkspaceController {
  
  getWorkspaces = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await workspaceService.getWorkspacesForUser(userId);
    res.status(200).json(new ApiResponse(200, result, 'Workspaces retrieved'));
  });

  getWorkspaceById = catchAsync(async (req: Request, res: Response) => {
    const result = await workspaceService.getWorkspaceDetails(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Workspace details retrieved'));
  });

  createWorkspace = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await workspaceService.createWorkspace(userId, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Workspace created'));
  });

  addMember = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { targetUserId, role } = req.body;
    const result = await workspaceService.addMemberToWorkspace(req.params.id, targetUserId, role, userId);
    res.status(200).json(new ApiResponse(200, result, 'Member added'));
  });

  getActivityFeed = catchAsync(async (req: Request, res: Response) => {
    // simplified: returning details which has activity feed
    const result = await workspaceService.getWorkspaceDetails(req.params.id);
    res.status(200).json(new ApiResponse(200, result?.activityFeed || [], 'Activity feed retrieved'));
  });
}

export const workspaceController = new WorkspaceController();
