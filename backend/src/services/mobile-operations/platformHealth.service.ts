import { mobileOperationsRepository } from '../../repositories/mobileOperations.repository';

class PlatformHealthService {
  async getHealth() {
    return mobileOperationsRepository.getServiceStatus();
  }
}

export const platformHealthService = new PlatformHealthService();
