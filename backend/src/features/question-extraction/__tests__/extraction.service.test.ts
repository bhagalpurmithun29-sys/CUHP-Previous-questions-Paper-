import { ExtractionService } from '../services/extraction.service';
import { ExtractionRepository } from '../repositories/extraction.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/extraction.repository');
jest.mock('../../audit/services/audit.service');

describe('ExtractionService', () => {
  let service: ExtractionService;
  
  beforeEach(() => {
    service = new ExtractionService();
    (service as any).repo = new ExtractionRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should queue a paper for extraction', async () => {
    const mockJob = { _id: 'job1', paperId: 'paper1', status: 'QUEUED' };
    ((service as any).repo.createOrUpdateJob as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.processPaper('paper1', 'admin1');
    
    expect(result.status).toBe('QUEUED');
    expect((service as any).repo.createOrUpdateJob).toHaveBeenCalledWith('paper1', expect.objectContaining({ status: 'QUEUED' }));
  });
  
  it('should record review action', async () => {
    const mockJob = { _id: 'job1', reviewStatus: 'APPROVED' };
    ((service as any).repo.createOrUpdateJob as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    const result = await service.reviewExtraction('paper1', 'APPROVE', 'admin1');
    
    expect(result.reviewStatus).toBe('APPROVED');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'EXTRACTION_APPROVED' }));
  });
});
