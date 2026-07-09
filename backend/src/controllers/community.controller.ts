import { Request, Response } from 'express';
import { communityService } from '../services/community.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const { type = 'overall', limit = 20 } = req.query;
  const data = await communityService.getLeaderboard(type as string, Number(limit));
  res.status(200).json(new ApiResponse(200, data, 'Leaderboard fetched successfully'));
});

export const getHallOfFame = catchAsync(async (req: Request, res: Response) => {
  const data = await communityService.getHallOfFame();
  res.status(200).json(new ApiResponse(200, data, 'Hall of Fame fetched successfully'));
});

export const getPublicProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await communityService.getPublicProfile(userId);
  res.status(200).json(new ApiResponse(200, data, 'Public profile fetched successfully'));
});
