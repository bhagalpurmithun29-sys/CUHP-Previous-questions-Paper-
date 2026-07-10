import { ReprocessingService } from '../services/reprocessing.service';
import { ReprocessingRepository } from '../repositories/reprocessing.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/reprocessing.repository');
jest.mock('../../audit/services/audit.service');

describe('ReprocessingService', () => {
  let service: ReprocessingService;
  
  beforeEach(() => {
    service = new ReprocessingService();
    (service as any).repo = new ReprocessingRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should start a job and log audit', async () => {
    const mockJob = { _id: 'job1', status: 'PENDING' };
    
    ((service as any).repo.createJob as jest.Mock).mockResolvedValue(mockJob);

    const data = { targetId: 'paper1', targetType: 'PAPER', triggerReason: 'Manual', modules: ['BLOOM'] };
    const result = await service.startJob(data, 'admin1');
    
    expect(result).toEqual(mockJob);
    expect((service as any).repo.createJob).toHaveBeenCalledWith({ ...data, triggeredBy: 'admin1', status: 'PENDING' });
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'REPROCESSING_STARTED' }));
  });

  it('should get history', async () => {
    const mockHistory = [{ _id: 'job1' }, { _id: 'job2' }];
    ((service as any).repo.getHistory as jest.Mock).mockResolvedValue(mockHistory);

    const result = await service.getHistory();
    
    expect(result).toEqual(mockHistory);
    expect((service as any).repo.getHistory).toHaveBeenCalled();
  });
  
  it('should retry a job and log audit', async () => {
    const mockJob = { _id: 'job1', status: 'PENDING' };
    ((service as any).repo.updateJobStatus as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.retryJob('job1', 'admin1');
    
    expect(result).toEqual(mockJob);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'RETRY_EXECUTED' }));
  });
});
