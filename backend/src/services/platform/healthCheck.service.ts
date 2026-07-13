import { platformRepository } from '../../repositories/platform.repository';

class HealthCheckService {
  async getHealth() {
    return platformRepository.getSystemHealthStatus();
  }

  async getDependencies() {
    return platformRepository.getDependencies();
  }

  async validateReadiness() {
    return platformRepository.validatePlatform();
  }
}

export const healthCheckService = new HealthCheckService();
