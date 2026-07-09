import { User } from '../../../models/user.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { LoginSession } from '../../../models/loginSession.model';
import { AuthAction } from '../../../enums/auth.enum';
import { AppError } from '../../../utils/AppError';
import { trustedDeviceService } from '../../../services/auth/mfa/TrustedDeviceService';

export class SecurityService {
  /**
   * Retrieves an overview including security score, active sessions count, etc.
   */
  static async getOverview(userId: string) {
    const user = await User.findById(userId).select('+backupCodes +passwordChangedAt');
    if (!user) throw new AppError('User not found', 404);

    const activeSessionsCount = await LoginSession.countDocuments({ userId, active: true });
    
    // Calculate Security Score (mock rules)
    let score = 0;
    const checks = {
      emailVerified: user.emailVerified,
      mfaEnabled: !!user.mfaEnabled,
      hasBackupCodes: user.backupCodes && user.backupCodes.length > 0,
      recentPasswordUpdate: user.passwordChangedAt ? (Date.now() - user.passwordChangedAt.getTime() < 90 * 24 * 60 * 60 * 1000) : false, // < 90 days
      strongPassword: true // Mocked
    };

    if (checks.emailVerified) score += 20;
    if (checks.mfaEnabled) score += 40;
    if (checks.hasBackupCodes) score += 10;
    if (checks.recentPasswordUpdate) score += 10;
    if (checks.strongPassword) score += 20;

    return {
      score,
      checks,
      metrics: {
        activeSessions: activeSessionsCount,
        trustedDevices: user.trustedDevices?.length || 0,
      }
    };
  }

  static async getSessions(userId: string) {
    return LoginSession.find({ userId, active: true }).sort({ lastActivity: -1 });
  }

  static async getDevices(userId: string) {
    const user = await User.findById(userId);
    return user?.trustedDevices || [];
  }

  static async getLoginHistory(userId: string) {
    return AuthAuditLog.find({ 
      userId, 
      action: { $in: [AuthAction.LOGIN, AuthAction.FAILED_LOGIN, AuthAction.LOGOUT] } 
    })
    .sort({ createdAt: -1 })
    .limit(20);
  }

  static async getEvents(userId: string) {
    return AuthAuditLog.find({ 
      userId, 
      action: { $nin: [AuthAction.LOGIN, AuthAction.FAILED_LOGIN, AuthAction.LOGOUT] } 
    })
    .sort({ createdAt: -1 })
    .limit(20);
  }

  static async revokeSession(userId: string, sessionId: string) {
    const session = await LoginSession.findOne({ _id: sessionId, userId });
    if (!session) throw new AppError('Session not found', 404);
    
    session.active = false;
    session.logoutAt = new Date();
    await session.save();

    await AuthAuditLog.create({
      userId,
      action: AuthAction.SESSION_REVOKED,
      metadata: { sessionId }
    });
  }

  static async revokeAllSessions(userId: string, currentSessionIdOrToken?: string) {
    // In a real app, exclude the current session. For this implementation we might just revoke all or rely on token revocation logic.
    await LoginSession.updateMany(
      { userId, active: true },
      { $set: { active: false, logoutAt: new Date() } }
    );

    // Note: To fully revoke, we might also need to increment the user's refreshTokenVersion to invalidate all existing refresh tokens.
    await User.findByIdAndUpdate(userId, { $inc: { refreshTokenVersion: 1 } });

    await AuthAuditLog.create({
      userId,
      action: AuthAction.SESSION_REVOKED,
      metadata: { note: 'All sessions revoked' }
    });
  }

  static async revokeDevice(userId: string, deviceId: string) {
    await trustedDeviceService.revokeDevice(userId, deviceId);
    
    await AuthAuditLog.create({
      userId,
      action: AuthAction.DEVICE_REVOKED as any,
      metadata: { deviceId }
    });
  }

  static async renameDevice(userId: string, deviceId: string, newName: string) {
    await trustedDeviceService.renameDevice(userId, deviceId, newName);
  }
}
