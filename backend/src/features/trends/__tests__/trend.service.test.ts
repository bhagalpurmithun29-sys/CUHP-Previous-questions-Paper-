import { TrendService } from '../services/trend.service';
import { TrendRepository } from '../repositories/trend.repository';

jest.mock('../repositories/trend.repository');

describe('TrendService', () => {
  let service: TrendService;
  
  beforeEach(() => {
    service = new TrendService();
    (service as any).repo = new TrendRepository();
  });

  it('should return overview statistics', async () => {
    const filters = { program: 'B.Tech CSE' };
    const result = await service.getOverview(filters);
    
    expect(result).toHaveProperty('totalPapersAnalyzed');
    expect(result).toHaveProperty('yearsCovered');
    expect(result).toHaveProperty('topGrowingTopic');
  });

  it('should return topic trends', async () => {
    const mockTrends = [{ year: 2021, topics: [] }];
    ((service as any).repo.aggregateTopicTrends as jest.Mock).mockResolvedValue(mockTrends);

    const result = await service.getTopicTrends({ year: 2021 });
    
    expect(result).toEqual(mockTrends);
    expect((service as any).repo.aggregateTopicTrends).toHaveBeenCalled();
  });
  
  it('should return bloom trends', async () => {
    const mockTrends = [{ year: 2021, Understand: 40 }];
    ((service as any).repo.aggregateBloomTrends as jest.Mock).mockResolvedValue(mockTrends);

    const result = await service.getBloomTrends({ year: 2021 });
    
    expect(result).toEqual(mockTrends);
    expect((service as any).repo.aggregateBloomTrends).toHaveBeenCalled();
  });
});
