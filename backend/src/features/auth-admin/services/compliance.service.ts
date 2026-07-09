import { User } from '../../../models/user.model';
import { AuthAuditLog } from '../../../models/authAuditLog.model';
import { AuthAction } from '../../../enums/auth.enum';
import { LoginSession } from '../../../models/loginSession.model';
import { Parser } from 'json2csv';

export class ComplianceService {
  async generateComplianceReport(type: 'authentication' | 'security' | 'compliance') {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    let data: any = {};

    if (type === 'authentication') {
      const logins = await AuthAuditLog.countDocuments({ action: AuthAction.LOGIN_SUCCESS, createdAt: { $gte: thirtyDaysAgo } });
      const mfaLogins = await AuthAuditLog.countDocuments({ action: AuthAction.MFA_SUCCESS, createdAt: { $gte: thirtyDaysAgo } });
      const failedLogins = await AuthAuditLog.countDocuments({ action: AuthAction.LOGIN_FAILED, createdAt: { $gte: thirtyDaysAgo } });
      
      data = { logins, mfaLogins, failedLogins, period: 'Last 30 Days' };
    } else if (type === 'security') {
      const lockedAccounts = await User.countDocuments({ lockUntil: { $gt: new Date() } });
      const passwordResets = await AuthAuditLog.countDocuments({ action: AuthAction.PASSWORD_RESET, createdAt: { $gte: thirtyDaysAgo } });
      
      data = { lockedAccounts, passwordResets, period: 'Last 30 Days' };
    } else {
      const mfaEnabled = await User.countDocuments({ mfaEnabled: true });
      const totalUsers = await User.countDocuments();
      
      data = { 
        mfaEnrollmentRate: totalUsers ? (mfaEnabled / totalUsers) * 100 : 0,
        mfaEnabled,
        totalUsers
      };
    }

    return data;
  }

  async exportToCSV(data: any[], fields: string[]) {
    try {
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      return csv;
    } catch (err) {
      console.error(err);
      throw new Error('Error generating CSV');
    }
  }
}

export const complianceService = new ComplianceService();
