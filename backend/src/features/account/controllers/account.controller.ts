import { Request, Response } from 'express';
import { AccountService } from '../services/account.service';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';
import { PreferencesRepository } from '../../preferences/repositories/preferences.repository';

export class AccountController {
  static getProfile = catchAsync(async (req: Request, res: Response) => {
    const data = await AccountService.getProfile(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Profile fetched', data });
  });

  static updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { profileData, academicData } = req.body;
    let data;
    if (profileData) {
      data = await AccountService.updateProfile(req.user!.id, profileData);
    }
    if (academicData) {
      data = await AccountService.updateAcademic(req.user!.id, academicData);
    }
    sendResponse({ res, statusCode: 200, message: 'Profile updated', data });
  });

  static updatePrivacy = catchAsync(async (req: Request, res: Response) => {
    const data = await PreferencesRepository.update(req.user!.id, { privacy: req.body } as any);
    sendResponse({ res, statusCode: 200, message: 'Privacy updated', data });
  });

  static uploadAvatar = catchAsync(async (req: Request, res: Response) => {
    // Expecting file handling middleware (like Multer) to attach file to req.file
    // For this example, assuming file URL is passed in body
    const { fileUrl } = req.body;
    const data = await AccountService.updateAvatar(req.user!.id, fileUrl);
    sendResponse({ res, statusCode: 200, message: 'Avatar updated', data });
  });

  static removeAvatar = catchAsync(async (req: Request, res: Response) => {
    const data = await AccountService.removeAvatar(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Avatar removed', data });
  });

  static exportData = catchAsync(async (req: Request, res: Response) => {
    const data = await AccountService.getExportData(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Export data generated', data });
  });

  static deleteAccount = catchAsync(async (req: Request, res: Response) => {
    // Should verify password/auth here before deletion
    await AccountService.deleteAccount(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Account deleted' });
  });
}
