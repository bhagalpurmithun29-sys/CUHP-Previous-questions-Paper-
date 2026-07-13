import { adminRepository } from '../../repositories/admin.repository';

class AlertService {
  async getActiveAlerts() {
    return adminRepository.getAlerts();
  }

  async acknowledgeAlert(alertId: string, userId: string) {
    // In production, log userId to audit trail
    return adminRepository.acknowledgeAlert(alertId);
  }
}

export const alertService = new AlertService();
