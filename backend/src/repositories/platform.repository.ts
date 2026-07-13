class PlatformRepository {
  private featureFlags: Record<string, boolean> = {
    'ai-chat': true,
    'paper-qa': true,
    'study-planner': true,
    'faculty-copilot': true,
    'strict-safety': true,
    'experimental-routing': false
  };

  async getFeatureFlags() {
    return this.featureFlags;
  }

  async setFeatureFlag(flag: string, enabled: boolean) {
    this.featureFlags[flag] = enabled;
    return this.featureFlags;
  }
}

export const platformRepository = new PlatformRepository();
