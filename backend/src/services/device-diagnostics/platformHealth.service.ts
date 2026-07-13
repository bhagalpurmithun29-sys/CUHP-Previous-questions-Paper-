import { diagnosticsRepository } from '../../repositories/diagnostics.repository';

class PlatformHealthService {
  async getHealth() {
    return diagnosticsRepository.getPlatformHealth();
  }
}

export const platformHealthService = new PlatformHealthService();
