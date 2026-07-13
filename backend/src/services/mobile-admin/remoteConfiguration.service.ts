import { mobileAdminRepository } from '../../repositories/mobileAdmin.repository';

class RemoteConfigurationService {
  async getConfiguration() {
    return mobileAdminRepository.getConfiguration();
  }

  async updateConfiguration(userId: string, updates: any) {
    return mobileAdminRepository.updateConfiguration(updates);
  }
}

export const remoteConfigurationService = new RemoteConfigurationService();
