import { Request, Response } from 'express';
import { legalService } from '../services/legal.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const getPublishedPolicies = catchAsync(async (req: Request, res: Response) => {
  const data = await legalService.getPublishedPolicies();
  res.status(200).json(new ApiResponse(200, data, 'Policies fetched successfully'));
});

export const getPolicyBySlug = catchAsync(async (req: Request, res: Response) => {
  const data = await legalService.getPolicyBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, data, 'Policy fetched successfully'));
});

export const saveConsent = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  
  const payload = { ...req.body };
  if (userId) payload.userId = userId;

  const data = await legalService.saveUserConsent(payload, ipAddress, userAgent);
  res.status(200).json(new ApiResponse(200, data, 'Consent saved successfully'));
});

export const getConsent = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const guestId = req.query.guestId as string;
  const data = await legalService.getUserConsent(userId, guestId);
  res.status(200).json(new ApiResponse(200, data, 'Consent fetched successfully'));
});
