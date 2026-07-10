import { GatewayService } from '../services/gateway.service';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../../audit/services/audit.service');

describe('GatewayService', () => {
  let service: GatewayService;
  
  beforeEach(() => {
    service = new GatewayService();
    (service as any).auditService = new AuditLogService();
  });

  it('should route chat request and log audit', async () => {
    const request = { prompt: 'Test prompt', model: 'gpt-4o' };
    const result = await service.chat(request, 'EXTRACTION', 'admin1');
    
    expect(result.text).toContain('[OpenAI gpt-4o]');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'AI_REQUEST_STARTED' }));
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'AI_REQUEST_COMPLETED' }));
  });

  it('should get providers', async () => {
    const result = service.getProviders();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('models');
  });
});
