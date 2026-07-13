import { communicationAnalyticsRepository } from '../../repositories/communicationAnalytics.repository';

class EngagementAnalyticsService {
  async getOverview(query: any) {
    const start = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = query.endDate ? new Date(query.endDate) : new Date();
    
    return communicationAnalyticsRepository.getOverviewMetrics(start, end);
  }

  async getDepartmentReports(query: any) {
    const start = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = query.endDate ? new Date(query.endDate) : new Date();
    
    return communicationAnalyticsRepository.getDepartmentMetrics(start, end);
  }
}

export const engagementAnalyticsService = new EngagementAnalyticsService();
