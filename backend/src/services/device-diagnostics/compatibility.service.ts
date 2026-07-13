import { diagnosticsRepository } from '../../repositories/diagnostics.repository';

class CompatibilityService {
  async getCompatibility() {
    return diagnosticsRepository.getAggregatedCapabilities();
  }
  
  async saveCapabilities(userId: string, capabilities: any) {
    return diagnosticsRepository.recordUserCapabilities(userId, capabilities);
  }
}

export const compatibilityService = new CompatibilityService();
