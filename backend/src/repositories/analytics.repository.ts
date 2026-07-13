import { Types } from 'mongoose';

class AnalyticsRepository {
  async getAggregatedOverview() {
    // Mocking an aggregation result from MongoDB
    return {
      totalInteractions: 145020,
      activeUsers: { daily: 4500, monthly: 12000 },
      topFeature: 'Academic AI Chat',
      avgLatency: 1.2
    };
  }

  async getFeatureAdoption() {
    return [
      { name: 'AI Chat', users: 8500 },
      { name: 'Paper Q&A', users: 6200 },
      { name: 'Study Planner', users: 3400 },
      { name: 'Faculty Copilot', users: 850 }
    ];
  }

  async getRoleDistribution() {
    return [
      { name: 'Students', value: 75 },
      { name: 'Faculty', value: 20 },
      { name: 'Moderators', value: 3 },
      { name: 'Administrators', value: 2 }
    ];
  }

  async getDepartmentStats() {
    return [
      { dept: 'Computer Science', requests: 45000 },
      { dept: 'Mathematics', requests: 32000 },
      { dept: 'Physics', requests: 28000 },
      { dept: 'Literature', requests: 12000 }
    ];
  }
}

export const analyticsRepository = new AnalyticsRepository();
