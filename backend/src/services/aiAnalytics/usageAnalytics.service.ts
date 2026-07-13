import { analyticsRepository } from '../../repositories/analytics.repository';

class UsageAnalyticsService {
  async getOverview(filters: any) {
    // In production, build MongoDB aggregation pipeline based on filters
    return analyticsRepository.getAggregatedOverview();
  }

  async getFeatures(filters: any) {
    return analyticsRepository.getFeatureAdoption();
  }

  async getRoles(filters: any) {
    return analyticsRepository.getRoleDistribution();
  }

  async getDepartments(filters: any) {
    return analyticsRepository.getDepartmentStats();
  }
}

export const usageAnalyticsService = new UsageAnalyticsService();
