import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { trustedDeviceService } from '../services/device-security/trustedDevice.service';
import { sessionManagementService } from '../services/device-security/sessionManagement.service';
import { webauthnService } from '../services/device-security/webauthn.service';

export class DeviceController {
  
  getDevices = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await trustedDeviceService.getTrustedDevices(userId);
    res.status(200).json(new ApiResponse(200, result, 'Devices retrieved'));
  });

  registerDevice = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await trustedDeviceService.registerDevice(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Device registered'));
  });

  updateDevice = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await trustedDeviceService.updateDevice(userId, req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Device updated'));
  });

  removeDevice = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await trustedDeviceService.removeDevice(userId, req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Device removed'));
  });

  getSessions = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await sessionManagementService.getActiveSessions(userId);
    res.status(200).json(new ApiResponse(200, result, 'Sessions retrieved'));
  });

  removeSession = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await sessionManagementService.terminateSession(userId, req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Session terminated'));
  });

  removeOtherSessions = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    // Assuming 'current_sess' is identified via middleware
    const result = await sessionManagementService.terminateOtherSessions(userId, 'current_sess');
    res.status(200).json(new ApiResponse(200, result, 'Other sessions terminated'));
  });

  webauthnRegister = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await webauthnService.verifyRegistration(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'WebAuthn registered'));
  });

  webauthnAuthenticate = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await webauthnService.verifyAuthentication(userId, req.body);
    res.status(200).json(new ApiResponse(200, result, 'WebAuthn authenticated'));
  });
}

export const deviceController = new DeviceController();
