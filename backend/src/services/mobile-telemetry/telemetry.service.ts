import { telemetryRepository } from '../../repositories/telemetry.repository';

class TelemetryService {
  async getOverview() {
    return telemetryRepository.getOverview();
  }

  async getStorageAnalytics() {
    return telemetryRepository.getStorageStats();
  }

  async getNetworkQuality() {
    return telemetryRepository.getNetworkStats();
  }
}

export const telemetryService = new TelemetryService();
