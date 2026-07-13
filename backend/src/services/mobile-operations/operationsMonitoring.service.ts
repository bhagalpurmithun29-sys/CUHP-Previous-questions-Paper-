import { mobileOperationsRepository } from '../../repositories/mobileOperations.repository';

class OperationsMonitoringService {
  async getOverview() {
    return mobileOperationsRepository.getHealthOverview();
  }
}

export const operationsMonitoringService = new OperationsMonitoringService();
