import { User } from '../../../models/user.model';
import { UpdateProfileDto, UpdateAcademicDto } from '../dtos/account.dto';

export class AccountService {
  static async getProfile(userId: string) {
    const user = await User.findById(userId).select('-password -backupCodes');
    return user;
  }

  static async updateProfile(userId: string, data: UpdateProfileDto) {
    return User.findByIdAndUpdate(userId, data, { new: true }).select('-password -backupCodes');
  }

  static async updateAcademic(userId: string, data: UpdateAcademicDto) {
    return User.findByIdAndUpdate(userId, data, { new: true }).select('-password -backupCodes');
  }

  static async updateAvatar(userId: string, fileUrl: string) {
    return User.findByIdAndUpdate(userId, { profileImage: fileUrl }, { new: true }).select('-password -backupCodes');
  }

  static async removeAvatar(userId: string) {
    return User.findByIdAndUpdate(userId, { $unset: { profileImage: 1 } }, { new: true }).select('-password -backupCodes');
  }

  static async deleteAccount(userId: string) {
    // In a real application, you might soft delete or schedule for deletion
    await User.findByIdAndDelete(userId);
    return { deleted: true };
  }

  static async getExportData(userId: string) {
    const user = await User.findById(userId).lean();
    // Gather related data from other collections (e.g. bookmarks, search history)
    // For now, return user profile
    return {
      profile: user,
      bookmarks: [], // Placeholder
      history: [] // Placeholder
    };
  }
}
