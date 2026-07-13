import { deviceRepository } from '../../repositories/device.repository';

class TrustedDeviceService {
  async getTrustedDevices(userId: string) {
    const devices = await deviceRepository.getDevices(userId);
    return devices;
  }

  async registerDevice(userId: string, deviceInfo: any) {
    const newDevice = {
      id: `dev_\${Date.now()}`,
      name: deviceInfo.name || 'Unknown Device',
      os: deviceInfo.os || 'Unknown OS',
      browser: deviceInfo.browser || 'Unknown Browser',
      trustedAt: new Date(),
      isTrusted: true
    };
    return await deviceRepository.addDevice(userId, newDevice);
  }

  async updateDevice(userId: string, deviceId: string, updates: any) {
    return await deviceRepository.updateDevice(userId, deviceId, updates);
  }

  async removeDevice(userId: string, deviceId: string) {
    return await deviceRepository.removeDevice(userId, deviceId);
  }
}

export const trustedDeviceService = new TrustedDeviceService();
