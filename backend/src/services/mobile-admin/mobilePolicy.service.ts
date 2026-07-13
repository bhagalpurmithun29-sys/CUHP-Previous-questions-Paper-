import { mobileAdminRepository } from '../../repositories/mobileAdmin.repository';

class MobilePolicyService {
  async getPolicies() {
    return mobileAdminRepository.getPolicies();
  }

  async updatePolicies(userId: string, updates: any) {
    return mobileAdminRepository.updatePolicies(updates);
  }
}

export const mobilePolicyService = new MobilePolicyService();
