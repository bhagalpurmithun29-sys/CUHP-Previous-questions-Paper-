import { StudentInsightsService } from '../services/student.service';
import { StudentInsightsRepository } from '../repositories/student.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/student.repository');
jest.mock('../../audit/services/audit.service');

describe('StudentInsightsService', () => {
  let service: StudentInsightsService;
  
  beforeEach(() => {
    service = new StudentInsightsService();
    (service as any).repo = new StudentInsightsRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should return dashboard statistics and log audit', async () => {
    const mockOverview = { completedPapers: 12, bookmarkedPapers: 24, totalStudyHours: 48, streakDays: 5 };
    
    ((service as any).repo.getDashboard as jest.Mock).mockResolvedValue(mockOverview);

    const result = await service.getDashboard('student1');
    
    expect(result).toEqual(mockOverview);
    expect((service as any).repo.getDashboard).toHaveBeenCalledWith('student1');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'STUDENT_DASHBOARD_VIEWED' }));
  });

  it('should get topic analysis', async () => {
    const mockTopics = { strongTopics: [], weakTopics: [], unreviewed: [] };
    ((service as any).repo.getTopics as jest.Mock).mockResolvedValue(mockTopics);

    const result = await service.getTopics('student1');
    
    expect(result).toEqual(mockTopics);
    expect((service as any).repo.getTopics).toHaveBeenCalledWith('student1');
  });
  
  it('should get recommendations and log audit', async () => {
    const mockRecs = [{ id: '1', title: 'Rec 1', reason: 'Reason 1' }];
    ((service as any).repo.getRecommendations as jest.Mock).mockResolvedValue(mockRecs);

    const result = await service.getRecommendations('student1');
    
    expect(result).toEqual(mockRecs);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'RECOMMENDATIONS_GENERATED' }));
  });
});
