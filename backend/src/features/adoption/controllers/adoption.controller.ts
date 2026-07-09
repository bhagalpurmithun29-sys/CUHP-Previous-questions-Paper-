import { Request, Response } from 'express';
import { AdoptionService } from '../services/adoption.service';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class AdoptionController {
  static getAdoptionState = catchAsync(async (req: Request, res: Response) => {
    const data = await AdoptionService.getAdoptionState(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Adoption state retrieved', data });
  });

  static updateProgress = catchAsync(async (req: Request, res: Response) => {
    const data = await AdoptionService.updateProgress(req.user!.id, req.body);
    sendResponse({ res, statusCode: 200, message: 'Adoption progress updated', data });
  });

  static resetAdoption = catchAsync(async (req: Request, res: Response) => {
    const data = await AdoptionService.resetAdoption(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Adoption state reset', data });
  });

  static getWhatsNew = catchAsync(async (req: Request, res: Response) => {
    const data = AdoptionService.getWhatsNew();
    sendResponse({ res, statusCode: 200, message: 'What\'s new retrieved', data });
  });
}
