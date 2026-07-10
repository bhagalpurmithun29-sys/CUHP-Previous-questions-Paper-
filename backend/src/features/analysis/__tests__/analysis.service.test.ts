import { AnalysisService } from '../services/analysis.service';
import { AnalysisRepository } from '../repositories/analysis.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/analysis.repository');
jest.mock('../../audit/services/audit.service');

describe('AnalysisService', () => {
  let service: AnalysisService;
  
  beforeEach(() => {
    service = new AnalysisService();
    (service as any).repo = new AnalysisRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should queue a paper for processing', async () => {
    const mockJob = { _id: 'job1', paperId: 'paper1', status: 'QUEUED' };
    ((service as any).repo.createOrUpdateJob as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.processPaper('paper1', 'admin1');
    
    expect(result.status).toBe('QUEUED');
    expect((service as any).repo.createOrUpdateJob).toHaveBeenCalledWith('paper1', expect.objectContaining({ status: 'QUEUED' }));
  });
  
  it('should return result if completed', async () => {
    const mockJob = { _id: 'job1', status: 'COMPLETED', result: { questionCount: 10 } };
    ((service as any).repo.getJob as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.getResult('paper1');
    
    expect(result).toEqual({ questionCount: 10 });
  });
});
