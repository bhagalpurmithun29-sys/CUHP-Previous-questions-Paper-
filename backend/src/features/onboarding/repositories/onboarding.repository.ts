import { Onboarding, IOnboarding } from '../../../models/onboarding.model';

export class OnboardingRepository {
  static async getByUserId(userId: string): Promise<IOnboarding> {
    let onboarding = await Onboarding.findOne({ userId });
    
    if (!onboarding) {
      onboarding = await Onboarding.create({ userId });
    }
    
    return onboarding;
  }

  static async updateProgress(userId: string, data: Partial<IOnboarding>): Promise<IOnboarding | null> {
    const flattenUpdate: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
        for (const [subKey, subValue] of Object.entries(value)) {
          flattenUpdate[`\${key}.\${subKey}`] = subValue;
        }
      } else {
        flattenUpdate[key] = value;
      }
    }

    return Onboarding.findOneAndUpdate(
      { userId },
      { $set: flattenUpdate },
      { new: true, upsert: true }
    );
  }

  static async complete(userId: string): Promise<IOnboarding | null> {
    return Onboarding.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          isCompleted: true, 
          completedAt: new Date(),
          'analytics.endTime': new Date()
        } 
      },
      { new: true }
    );
  }
}
