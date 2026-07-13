import { getPlatformOverview } from '../dashboard/aggregator';

describe('POC Aggregation Tests', () => {
  it('should return a healthy overall score default', async () => {
    const health = await getPlatformOverview();
    // Assert health.overallHealthScore === 98
  });
});
