import { Request, Response } from 'express';
import { publicStatsService } from '../services/publicStats.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const getStatistics = catchAsync(async (req: Request, res: Response) => {
  const data = await publicStatsService.getStatistics();
  res.status(200).json(new ApiResponse(200, data, 'Statistics fetched successfully'));
});

export const getCoverage = catchAsync(async (req: Request, res: Response) => {
  const data = await publicStatsService.getCoverage();
  res.status(200).json(new ApiResponse(200, data, 'Coverage data fetched successfully'));
});

export const getTrending = catchAsync(async (req: Request, res: Response) => {
  const data = await publicStatsService.getTrending();
  res.status(200).json(new ApiResponse(200, data, 'Trending data fetched successfully'));
});

export const getActivity = catchAsync(async (req: Request, res: Response) => {
  const data = await publicStatsService.getActivity();
  res.status(200).json(new ApiResponse(200, data, 'Public activity fetched successfully'));
});

export const getReports = catchAsync(async (req: Request, res: Response) => {
  const { format = 'csv' } = req.query;
  const data = await publicStatsService.generateReportBuffer(format as string);
  // Real implementation would set headers and send buffer
  res.status(200).json(new ApiResponse(200, data, 'Report generated successfully'));
});
