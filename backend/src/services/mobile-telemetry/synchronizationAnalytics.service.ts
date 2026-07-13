import { telemetryRepository } from '../../repositories/telemetry.repository';

class SynchronizationAnalyticsService {
  async getSyncAnalytics() {
    return telemetryRepository.getSyncStats();
  }
}

export const synchronizationAnalyticsService = new SynchronizationAnalyticsService();
