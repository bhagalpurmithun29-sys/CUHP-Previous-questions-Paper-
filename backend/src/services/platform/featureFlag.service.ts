import { platformRepository } from '../../repositories/platform.repository';

class FeatureFlagService {
  async getFlags() {
    return platformRepository.getFeatureFlags();
  }

  async toggleFlag(flag: string, enabled: boolean, userId: string) {
    // In production, log audit trail here
    return platformRepository.setFeatureFlag(flag, enabled);
  }
}

export const featureFlagService = new FeatureFlagService();
