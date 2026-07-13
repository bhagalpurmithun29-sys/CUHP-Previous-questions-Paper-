class PlatformOverviewService {
  async getOverview() {
    return {
      totalRequests: 2450890,
      activeProviders: 2,
      totalPrompts: 145,
      activeUsers: 8430,
      costEstimate: 450.25,
      uptime: 99.99
    };
  }
}

export const platformOverviewService = new PlatformOverviewService();
