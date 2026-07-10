import { AggregationService } from '../services/aggregation.service';
import { AnalyticsRepository } from '../repositories/analytics.repository';

jest.mock('../repositories/analytics.repository');

describe('AggregationService', () => {
  let service: AggregationService;
  
  beforeEach(() => {
    service = new AggregationService();
    (service as any).repo = new AnalyticsRepository();
  });

  it('should aggregate overview data correctly', async () => {
    const mockData = [
      { _id: 'APPROVED', count: 10, totalSize: 10485760 }, // 10MB
      { _id: 'PENDING', count: 5, totalSize: 5242880 },   // 5MB
    ];
    
    ((service as any).repo.getPaperOverview as jest.Mock).mockResolvedValue(mockData);

    const result = await service.getOverview();

    expect(result.totalPapers).toBe(15);
    expect(result.approvedPapers).toBe(10);
    expect(result.pendingPapers).toBe(5);
    expect(result.totalStorageMB).toBe(15); 
  });
});
