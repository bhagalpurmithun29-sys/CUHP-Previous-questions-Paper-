class EngagementAnalyticsService {
  async getSessionMetrics() {
    return {
      avgSessionDurationMins: 14.5,
      avgQueriesPerSession: 6.2,
      searchToChatConversion: 0.38,
      citationClickRate: 0.42
    };
  }
}

export const engagementAnalyticsService = new EngagementAnalyticsService();
