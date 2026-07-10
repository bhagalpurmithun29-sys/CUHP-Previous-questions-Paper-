import { InsightService } from '../services/insight.service';
import { InsightRepository } from '../repositories/insight.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { PatternRepository } from '../../pattern-analysis/repositories/pattern.repository';

jest.mock('../repositories/insight.repository');
jest.mock('../../audit/services/audit.service');
jest.mock('../../pattern-analysis/repositories/pattern.repository');

describe('InsightService', () => {
  let service: InsightService;
  
  beforeEach(() => {
    service = new InsightService();
    (service as any).repo = new InsightRepository();
    (service as any).auditService = new AuditLogService();
    (service as any).patternRepo = new PatternRepository();
  });

  it('should queue insight generation if pattern analysis is approved', async () => {
    ((service as any).patternRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'APPROVED' });
    
    const mockJob = { _id: 'job1', paperId: 'paper1', status: 'QUEUED' };
    ((service as any).repo.createOrUpdateJob as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.processPaper('paper1', 'admin1');
    
    expect(result.status).toBe('QUEUED');
    expect((service as any).repo.createOrUpdateJob).toHaveBeenCalledWith('paper1', expect.objectContaining({ status: 'QUEUED' }));
  });
  
  it('should throw error if pattern analysis is not approved', async () => {
    ((service as any).patternRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'PENDING_REVIEW' });
    
    await expect(service.processPaper('paper1', 'admin1')).rejects.toThrow('Pattern analysis must be completed and approved');
  });

  it('should get insights', async () => {
    const mockInsight = { paperId: 'paper1', status: 'COMPLETED' };
    ((service as any).repo.getJob as jest.Mock).mockResolvedValue(mockInsight);

    const result = await service.getInsights('paper1');
    
    expect(result).toEqual(mockInsight);
    expect((service as any).repo.getJob).toHaveBeenCalledWith('paper1');
  });
});
