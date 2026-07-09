import { User } from '../../../models/user.model';
import { AppError } from '../../../utils/AppError';
import crypto from 'crypto';

export class TrustedDeviceService {
  /**
   * Registers a new trusted device for the user
   */
  async registerDevice(userId: string, userAgent: string, ipAddress: string): Promise<string> {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const deviceId = crypto.randomBytes(32).toString('hex');
    const deviceName = this.parseUserAgent(userAgent);

    user.trustedDevices = user.trustedDevices || [];
    user.trustedDevices.push({
      deviceId,
      deviceName,
      lastUsed: new Date()
    });

    await user.save();
    return deviceId; // Client stores this in an HttpOnly cookie
  }

  /**
   * Verifies if a device is trusted
   */
  async isDeviceTrusted(userId: string, deviceId: string): Promise<boolean> {
    if (!deviceId) return false;

    const user = await User.findById(userId);
    if (!user || !user.trustedDevices) return false;

    const device = user.trustedDevices.find((d: any) => d.deviceId === deviceId);
    
    if (device) {
      // Update last used
      device.lastUsed = new Date();
      await user.save();
      return true;
    }
    return false;
  }

  /**
   * Revokes a specific trusted device
   */
  async revokeDevice(userId: string, deviceId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    if (user.trustedDevices) {
      user.trustedDevices = user.trustedDevices.filter((d: any) => d.deviceId !== deviceId);
      await user.save();
    }
  }

  /**
   * Renames a trusted device
   */
  async renameDevice(userId: string, deviceId: string, newName: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user || !user.trustedDevices) throw new AppError('User not found', 404);

    const device = user.trustedDevices.find((d: any) => d.deviceId === deviceId);
    if (device) {
      device.deviceName = newName;
      await user.save();
    }
  }

  private parseUserAgent(ua: string): string {
    // Basic mock parser
    if (ua.includes('iPhone')) return 'Apple iPhone';
    if (ua.includes('Macintosh')) return 'MacBook / Mac Desktop';
    if (ua.includes('Windows')) return 'Windows PC';
    if (ua.includes('Android')) return 'Android Device';
    return 'Unknown Device';
  }
}

export const trustedDeviceService = new TrustedDeviceService();
