import { User } from '../../../models/user.model';
import { Setting, SettingCategory } from '../../../models/setting.model';
import { AppError } from '../../../utils/AppError';
import { AccountStatus } from '../../../enums/auth.enum';

export class IdentityService {
  async getIdentityStats() {
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const activeUsers = await User.countDocuments({ isDeleted: false, accountStatus: AccountStatus.ACTIVE });
    const lockedUsers = await User.countDocuments({ isDeleted: false, lockUntil: { $gt: new Date() } });
    const mfaEnabled = await User.countDocuments({ isDeleted: false, mfaEnabled: true });

    return {
      totalUsers,
      activeUsers,
      lockedUsers,
      mfaEnabled,
      mfaEnrollmentRate: totalUsers > 0 ? (mfaEnabled / totalUsers) * 100 : 0
    };
  }

  async getProviders() {
    const googleUsers = await User.countDocuments({ 'authProviders.provider': 'google', isDeleted: false });
    const microsoftUsers = await User.countDocuments({ 'authProviders.provider': 'microsoft', isDeleted: false });
    const localUsers = await User.countDocuments({ authProviders: { $size: 0 }, isDeleted: false });

    return {
      google: googleUsers,
      microsoft: microsoftUsers,
      local: localUsers
    };
  }

  async updatePasswordPolicy(policyDetails: any, adminId: string) {
    const settingKey = 'AUTH_PASSWORD_POLICY';
    
    let setting = await Setting.findOne({ key: settingKey });
    
    if (!setting) {
      setting = new Setting({
        key: settingKey,
        category: SettingCategory.AUTHENTICATION,
        description: 'Global Password Policy',
        type: 'json',
        isPublic: false,
      });
    }

    setting.value = policyDetails;
    setting.updatedBy = adminId as any;
    
    await setting.save();
    return setting.value;
  }

  async getPasswordPolicy() {
    const settingKey = 'AUTH_PASSWORD_POLICY';
    const setting = await Setting.findOne({ key: settingKey });
    
    return setting ? setting.value : {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    };
  }
}

export const identityService = new IdentityService();
