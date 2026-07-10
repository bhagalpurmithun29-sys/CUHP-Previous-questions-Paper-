import { BatchService } from '../services/batch.service';
import { BatchRepository } from '../repositories/batch.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/batch.repository');
jest.mock('../../audit/services/audit.service');

describe('BatchService', () => {
  let service: BatchService;
  
  beforeEach(() => {
    service = new BatchService();
    (service as any).repo = new BatchRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should start a batch job and log audit', async () => {
    const mockJob = { _id: 'job1', status: 'QUEUED' };
    
    ((service as any).repo.createJob as jest.Mock).mockResolvedValue(mockJob);

    const data = { name: 'Fall 2023 Processing', scopeType: 'ALL', jobType: 'INITIAL', modules: ['EXTRACTION'] };
    const result = await service.startJob(data, 'admin1');
    
    expect(result).toEqual(mockJob);
    expect((service as any).repo.createJob).toHaveBeenCalledWith({ ...data, createdBy: 'admin1', status: 'QUEUED', stats: expect.any(Object) });
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'BATCH_STARTED' }));
  });

  it('should get history', async () => {
    const mockHistory = [{ _id: 'job1' }, { _id: 'job2' }];
    ((service as any).repo.getHistory as jest.Mock).mockResolvedValue(mockHistory);

    const result = await service.getHistory();
    
    expect(result).toEqual(mockHistory);
    expect((service as any).repo.getHistory).toHaveBeenCalled();
  });
  
  it('should cancel a job and log audit', async () => {
    const mockJob = { _id: 'job1', status: 'CANCELLED' };
    ((service as any).repo.updateJobStatus as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.cancelJob('job1', 'admin1');
    
    expect(result).toEqual(mockJob);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'BATCH_CANCELLED' }));
  });
});
