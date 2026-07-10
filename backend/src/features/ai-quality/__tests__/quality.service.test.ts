import { QualityService } from '../services/quality.service';
import { QualityRepository } from '../repositories/quality.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/quality.repository');
jest.mock('../../audit/services/audit.service');

describe('QualityService', () => {
  let service: QualityService;
  
  beforeEach(() => {
    service = new QualityService();
    (service as any).repo = new QualityRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should process review decision and log audit', async () => {
    const mockReview = { _id: 'review1', status: 'APPROVED' };
    
    ((service as any).repo.updateReviewStatus as jest.Mock).mockResolvedValue(mockReview);

    const decision = { status: 'APPROVED', notes: 'Looks good' };
    const result = await service.processReviewDecision('review1', decision, 'admin1');
    
    expect(result).toEqual(mockReview);
    expect((service as any).repo.updateReviewStatus).toHaveBeenCalledWith('review1', 'APPROVED', 'Looks good', undefined, undefined);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'REVIEW_DECISION_APPROVED' }));
  });

  it('should get metrics', async () => {
    const mockMetrics = { total: 100, approved: 90, corrected: 10, acceptanceRate: 90, overrideRate: 10 };
    ((service as any).repo.getMetrics as jest.Mock).mockResolvedValue(mockMetrics);

    const result = await service.getMetrics();
    
    expect(result).toEqual(mockMetrics);
    expect((service as any).repo.getMetrics).toHaveBeenCalled();
  });
  
  it('should request reprocess and log audit', async () => {
    const mockReview = { _id: 'review1', status: 'PENDING_REVIEW' };
    ((service as any).repo.updateReviewStatus as jest.Mock).mockResolvedValue(mockReview);

    const result = await service.requestReprocess('review1', 'admin1');
    
    expect(result).toEqual(mockReview);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'REVIEW_REPROCESS_REQUESTED' }));
  });
});
