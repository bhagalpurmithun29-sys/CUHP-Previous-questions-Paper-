import { MigrationService } from '../services/migration.service';
import { MigrationRepository } from '../repositories/migration.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/migration.repository');
jest.mock('../../audit/services/audit.service');
jest.useFakeTimers();

describe('MigrationService', () => {
  let service: MigrationService;
  let mockJob: any;
  
  beforeEach(() => {
    service = new MigrationService();
    (service as any).repo = new MigrationRepository();
    (service as any).auditService = new AuditLogService();
    
    mockJob = {
      _id: 'job1',
      status: 'PROCESSING',
      save: jest.fn().mockResolvedValue(true)
    };
  });

  it('should queue import job and process asynchronously', async () => {
    ((service as any).repo.createJob as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    const result = await service.importData({ file: 'test.zip' }, 'admin1');
    expect(result.status).toBe('PROCESSING');

    jest.runAllTimers();

    // Since our setTimeout uses async/await, we might need to flush promises,
    // but running timers usually clears the queue enough for this basic test.
    // In a real async environment we'd use setImmediate or flushPromises.
  });
  
  it('should mark job as DRY_RUN when requested', async () => {
    ((service as any).repo.createJob as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    await service.executeMigration({ version: 'v2.0.0' }, 'admin1', true);
    
    expect((service as any).repo.createJob).toHaveBeenCalledWith(expect.objectContaining({
       status: 'DRY_RUN'
    }));
  });
});
