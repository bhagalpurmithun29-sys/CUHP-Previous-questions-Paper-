import { adminRepository } from '../../repositories/admin.repository';

class ConfigurationService {
  async getConfig() {
    return adminRepository.getConfiguration();
  }

  async updateConfig(updates: any, userId: string) {
    // In production, validate updates and track audit logs using userId
    return adminRepository.updateConfiguration(updates);
  }
}

export const configurationService = new ConfigurationService();
