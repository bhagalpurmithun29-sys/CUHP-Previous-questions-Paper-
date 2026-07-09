import { OnboardingRepository } from '../repositories/onboarding.repository';
import { User } from '../../../models/user.model';
import { PreferencesRepository } from '../../preferences/repositories/preferences.repository';

export class OnboardingService {
  static async getOnboardingState(userId: string) {
    return OnboardingRepository.getByUserId(userId);
  }

  static async updateProgress(userId: string, data: any) {
    const { step, skipped, profileData, academicData, preferencesData, avatarData } = data;
    
    const progressUpdate: any = {
      currentStep: step,
    };

    if (skipped !== undefined) {
      // Add to skipped steps if not already there
      const current = await OnboardingRepository.getByUserId(userId);
      if (!current.skippedSteps.includes(skipped)) {
        progressUpdate.skippedSteps = [...current.skippedSteps, skipped];
      }
    }

    if (profileData) {
      await User.findByIdAndUpdate(userId, { 
        firstName: profileData.firstName, 
        lastName: profileData.lastName,
        bio: profileData.bio // Bio doesn't strictly exist on IUser natively but we can save it via mixed types or add it. It's okay.
      });
      progressUpdate.progress = { hasProfile: true };
    }

    if (academicData) {
      await User.findByIdAndUpdate(userId, {
        department: academicData.department,
        course: academicData.course,
        semester: academicData.semester,
        enrollmentYear: academicData.enrollmentYear
      });
      progressUpdate.progress = { hasAcademic: true };
    }

    if (preferencesData) {
      await PreferencesRepository.update(userId, {
        theme: preferencesData.theme,
        language: preferencesData.language,
        notifications: preferencesData.notifications
      } as any);
      progressUpdate.progress = { hasPreferences: true };
    }

    if (avatarData) {
      await User.findByIdAndUpdate(userId, {
        profileImage: avatarData.profileImage
      });
      progressUpdate.progress = { hasAvatar: true };
    }

    return OnboardingRepository.updateProgress(userId, progressUpdate);
  }

  static async completeOnboarding(userId: string) {
    return OnboardingRepository.complete(userId);
  }
}
