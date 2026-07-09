import { Request, Response } from 'express';
import { OnboardingService } from '../services/onboarding.service';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class OnboardingController {
  static getOnboarding = catchAsync(async (req: Request, res: Response) => {
    const data = await OnboardingService.getOnboardingState(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Onboarding state retrieved', data });
  });

  static startOnboarding = catchAsync(async (req: Request, res: Response) => {
    // For this implementation, getOnboardingState automatically initializes it if missing
    const data = await OnboardingService.getOnboardingState(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Onboarding started', data });
  });

  static updateProgress = catchAsync(async (req: Request, res: Response) => {
    const data = await OnboardingService.updateProgress(req.user!.id, req.body);
    sendResponse({ res, statusCode: 200, message: 'Onboarding progress updated', data });
  });

  static completeOnboarding = catchAsync(async (req: Request, res: Response) => {
    const data = await OnboardingService.completeOnboarding(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Onboarding completed successfully', data });
  });
}
