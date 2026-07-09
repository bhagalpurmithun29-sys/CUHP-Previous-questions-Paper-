import { Request, Response } from 'express';
import { mfaService } from '../services/auth/mfa/MfaService';
import { trustedDeviceService } from '../services/auth/mfa/TrustedDeviceService';

export class MfaController {
  async setup(req: Request, res: Response) {
    try {
      const data = await mfaService.setup(req.user!.id);
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async enable(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const data = await mfaService.enable(req.user!.id, token);
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { token, rememberDevice } = req.body;
      // req.ip can be used, defaulting to mock IP if undefined
      const ip = req.ip || req.connection?.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'Unknown Browser';

      const data = await mfaService.verify(req.user!.id, token, userAgent, ip, rememberDevice);
      
      if (data.deviceId) {
        res.cookie('trusted_device', data.deviceId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
      }

      res.status(200).json({ status: 'success', data: { verified: true } });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async recover(req: Request, res: Response) {
    try {
      const { code } = req.body;
      const data = await mfaService.recover(req.user!.id, code);
      res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async disable(req: Request, res: Response) {
    try {
      const { token } = req.body;
      await mfaService.disable(req.user!.id, token);
      res.status(200).json({ status: 'success', message: 'MFA Disabled' });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  async getTrustedDevices(req: Request, res: Response) {
    try {
      // Need to fetch from user model since trustedDeviceService doesn't have a direct get method.
      // But we can just use req.user.trustedDevices if it's populated.
      // Let's import User model or just return req.user if it has trustedDevices
      // To be safe, we query it.
      const mongoose = require('mongoose');
      const User = mongoose.model('User');
      const user = await User.findById(req.user!.id).select('trustedDevices');
      res.status(200).json({ status: 'success', data: { devices: user?.trustedDevices || [] } });
    } catch (error: any) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async revokeTrustedDevice(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await trustedDeviceService.revokeDevice(req.user!.id, id);
      res.status(200).json({ status: 'success', message: 'Device revoked' });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
}

export const mfaController = new MfaController();
