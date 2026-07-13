import { mobilePlatformRepository } from '../../repositories/mobilePlatform.repository';

class DeploymentReadinessService {
  async getReadiness() {
    return mobilePlatformRepository.getReadiness();
  }
}

export const deploymentReadinessService = new DeploymentReadinessService();
