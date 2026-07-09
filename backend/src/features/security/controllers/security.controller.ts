import { Request, Response } from 'express';
import { SecurityService } from '../services/security.service';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class SecurityController {
  static getOverview = catchAsync(async (req: Request, res: Response) => {
    const data = await SecurityService.getOverview(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Security overview retrieved', data });
  });

  static getSessions = catchAsync(async (req: Request, res: Response) => {
    const data = await SecurityService.getSessions(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Active sessions retrieved', data });
  });

  static getDevices = catchAsync(async (req: Request, res: Response) => {
    const data = await SecurityService.getDevices(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Trusted devices retrieved', data });
  });

  static getLoginHistory = catchAsync(async (req: Request, res: Response) => {
    const data = await SecurityService.getLoginHistory(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Login history retrieved', data });
  });

  static getEvents = catchAsync(async (req: Request, res: Response) => {
    const data = await SecurityService.getEvents(req.user!.id);
    sendResponse({ res, statusCode: 200, message: 'Security events retrieved', data });
  });

  static revokeSession = catchAsync(async (req: Request, res: Response) => {
    await SecurityService.revokeSession(req.user!.id, req.params.id);
    sendResponse({ res, statusCode: 200, message: 'Session revoked successfully' });
  });

  static revokeAllSessions = catchAsync(async (req: Request, res: Response) => {
    await SecurityService.revokeAllSessions(req.user!.id, req.sessionId || req.headers.authorization); // Passing current session id or token if possible
    sendResponse({ res, statusCode: 200, message: 'All other sessions revoked successfully' });
  });

  static revokeDevice = catchAsync(async (req: Request, res: Response) => {
    await SecurityService.revokeDevice(req.user!.id, req.params.id);
    sendResponse({ res, statusCode: 200, message: 'Device revoked successfully' });
  });

  static renameDevice = catchAsync(async (req: Request, res: Response) => {
    await SecurityService.renameDevice(req.user!.id, req.params.id, req.body.name);
    sendResponse({ res, statusCode: 200, message: 'Device renamed successfully' });
  });
}
