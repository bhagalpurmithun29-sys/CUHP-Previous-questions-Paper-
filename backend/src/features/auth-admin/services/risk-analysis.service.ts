import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AuthAction } from '../../../enums/auth.enum';

export class RiskAnalysisService {
  async getRiskOverview() {
    // Analytics for repeated failed logins (brute force detection)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const repeatedFailedLogins = await AuthAuditLog.aggregate([
      { 
        $match: { 
          action: AuthAction.LOGIN_FAILED,
          createdAt: { $gte: twentyFourHoursAgo }
        }
      },
      {
        $group: {
          _id: '$ipAddress',
          count: { $sum: 1 },
          emails: { $addToSet: '$emailAttempted' },
          lastAttempt: { $max: '$createdAt' }
        }
      },
      {
        $match: { count: { $gte: 5 } } // IPs with 5+ failed attempts
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    const newDeviceSignIns = await AuthAuditLog.find({
      action: AuthAction.LOGIN_SUCCESS, // Assuming there's a specific action or metadata for new devices, simplified here
      createdAt: { $gte: twentyFourHoursAgo }
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('userId', 'firstName lastName email')
    .lean();

    return {
      repeatedFailedLogins,
      newDeviceSignIns,
      highRiskIPs: repeatedFailedLogins.length,
      recentAlerts: repeatedFailedLogins.reduce((acc, curr) => acc + curr.count, 0)
    };
  }
}

export const riskAnalysisService = new RiskAnalysisService();
