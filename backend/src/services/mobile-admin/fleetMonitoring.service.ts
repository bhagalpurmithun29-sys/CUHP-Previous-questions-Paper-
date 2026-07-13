import { mobileAdminRepository } from '../../repositories/mobileAdmin.repository';

class FleetMonitoringService {
  async getFleetOverview() {
    return mobileAdminRepository.getFleetStatus();
  }

  async getPlatformHealth() {
    return mobileAdminRepository.getHealth();
  }
}

export const fleetMonitoringService = new FleetMonitoringService();
