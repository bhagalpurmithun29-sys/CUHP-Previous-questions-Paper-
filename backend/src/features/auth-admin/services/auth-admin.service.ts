import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { LoginSession } from '../../../models/loginSession.model';
import { AuthAction } from '../../../enums/auth.enum';

export class AuthAdminService {
  async getDashboardAnalytics() {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Success vs Failure Rates (Last 24h)
    const loginStats = await AuthAuditLog.aggregate([
      { $match: { createdAt: { $gte: twentyFourHoursAgo }, action: { $in: [AuthAction.LOGIN_SUCCESS, AuthAction.LOGIN_FAILED] } } },
      { $group: { _id: '$action', count: { $sum: 1 } } }
    ]);

    let successCount = 0;
    let failureCount = 0;

    loginStats.forEach(stat => {
      if (stat._id === AuthAction.LOGIN_SUCCESS) successCount = stat.count;
      if (stat._id === AuthAction.LOGIN_FAILED) failureCount = stat.count;
    });

    const totalLogins = successCount + failureCount;
    const successRate = totalLogins > 0 ? (successCount / totalLogins) * 100 : 0;
    const failureRate = totalLogins > 0 ? (failureCount / totalLogins) * 100 : 0;

    // 2. Active Sessions
    const activeSessions = await LoginSession.countDocuments({ active: true, lastActivity: { $gte: twentyFourHoursAgo } });

    // 3. Peak Login Hours (Last 30 Days)
    const peakHours = await AuthAuditLog.aggregate([
      { $match: { action: AuthAction.LOGIN_SUCCESS, createdAt: { $gte: thirtyDaysAgo } } },
      { 
        $group: {
          _id: { $hour: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 24 }
    ]);

    // Format peak hours for charts
    const peakHoursFormatted = Array.from({ length: 24 }).map((_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      count: peakHours.find(p => p._id === i)?.count || 0
    }));

    // 4. Authentication Methods (Mocked or derived from provider if available)
    const authMethods = [
      { method: 'Local / Password', count: successCount },
      { method: 'MFA', count: await AuthAuditLog.countDocuments({ action: AuthAction.MFA_SUCCESS, createdAt: { $gte: twentyFourHoursAgo } }) }
    ];

    return {
      successRate,
      failureRate,
      totalLogins,
      activeSessions,
      peakHours: peakHoursFormatted.sort((a, b) => parseInt(a.hour) - parseInt(b.hour)),
      authMethods
    };
  }
}

export const authAdminService = new AuthAdminService();
