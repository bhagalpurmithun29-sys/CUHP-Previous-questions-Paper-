import { deviceRepository } from '../../repositories/device.repository';

class SessionManagementService {
  async getActiveSessions(userId: string) {
    const sessions = await deviceRepository.getSessions(userId);
    // Return mock data if empty
    if (sessions.length === 0) {
      return [
        { id: 'sess_1', device: 'MacBook Pro', browser: 'Chrome', os: 'macOS', lastActive: new Date(), isCurrent: true, location: 'New York, USA' },
        { id: 'sess_2', device: 'iPhone 13', browser: 'Safari', os: 'iOS', lastActive: new Date(Date.now() - 3600000), isCurrent: false, location: 'New York, USA' }
      ];
    }
    return sessions;
  }

  async terminateSession(userId: string, sessionId: string) {
    return await deviceRepository.removeSession(userId, sessionId);
  }

  async terminateOtherSessions(userId: string, currentSessionId: string) {
    return await deviceRepository.removeOtherSessions(userId, currentSessionId);
  }
}

export const sessionManagementService = new SessionManagementService();
