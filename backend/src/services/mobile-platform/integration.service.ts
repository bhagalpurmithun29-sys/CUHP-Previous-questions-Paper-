import { mobilePlatformRepository } from '../../repositories/mobilePlatform.repository';

class IntegrationService {
  async getOverview() {
    return mobilePlatformRepository.getPlatformOverview();
  }

  async getDependencies() {
    return mobilePlatformRepository.getDependencies();
  }
}

export const integrationService = new IntegrationService();
