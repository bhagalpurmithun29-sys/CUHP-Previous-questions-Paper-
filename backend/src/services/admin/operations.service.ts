import { communicationAdminRepository } from '../../repositories/communicationAdmin.repository';

class OperationsService {
  async getOverview() {
    return communicationAdminRepository.getSystemOverview();
  }

  async getConfiguration() {
    return communicationAdminRepository.getConfiguration();
  }

  async updateConfiguration(data: any) {
    return communicationAdminRepository.updateConfiguration(data);
  }

  async getAlerts() {
    return communicationAdminRepository.getActiveAlerts();
  }
}

export const operationsService = new OperationsService();
