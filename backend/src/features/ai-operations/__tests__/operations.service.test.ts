import { OperationsService } from '../services/operations.service';
import { OperationsRepository } from '../repositories/operations.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/operations.repository');
jest.mock('../../audit/services/audit.service');

describe('OperationsService', () => {
  let service: OperationsService;
  
  beforeEach(() => {
    service = new OperationsService();
    (service as any).repo = new OperationsRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should get overview and log audit', async () => {
    const mockOverview = { papersProcessed: 1250 };
    
    ((service as any).repo.getOverview as jest.Mock).mockResolvedValue(mockOverview);

    const result = await service.getOverview('admin1');
    
    expect(result).toEqual(mockOverview);
    expect((service as any).repo.getOverview).toHaveBeenCalled();
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'OPERATIONS_DASHBOARD_VIEWED' }));
  });

  it('should get pipeline health', async () => {
    const mockHealth = { status: 'HEALTHY' };
    ((service as any).repo.getPipelineHealth as jest.Mock).mockResolvedValue(mockHealth);

    const result = await service.getPipelineHealth();
    
    expect(result).toEqual(mockHealth);
  });
});
