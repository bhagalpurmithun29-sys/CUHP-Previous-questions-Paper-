import { FacultyAnalyticsService } from '../services/faculty.service';
import { FacultyAnalyticsRepository } from '../repositories/faculty.repository';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../repositories/faculty.repository');
jest.mock('../../audit/services/audit.service');

describe('FacultyAnalyticsService', () => {
  let service: FacultyAnalyticsService;
  
  beforeEach(() => {
    service = new FacultyAnalyticsService();
    (service as any).repo = new FacultyAnalyticsRepository();
    (service as any).auditService = new AuditLogService();
  });

  it('should return overview statistics and log audit', async () => {
    const filters = { program: 'B.Tech CSE' };
    const mockOverview = { activeCourses: 24, totalAssessments: 142, curriculumCoverage: 87, averageQualityScore: 92 };
    
    ((service as any).repo.getOverview as jest.Mock).mockResolvedValue(mockOverview);

    const result = await service.getOverview(filters, 'admin1');
    
    expect(result).toEqual(mockOverview);
    expect((service as any).repo.getOverview).toHaveBeenCalledWith(filters);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'FACULTY_DASHBOARD_VIEWED' }));
  });

  it('should get curriculum coverage', async () => {
    const filters = { program: 'B.Tech CSE' };
    const mockCoverage = [{ unit: 'Unit 1', coverage: 95 }];
    ((service as any).repo.getCurriculumCoverage as jest.Mock).mockResolvedValue(mockCoverage);

    const result = await service.getCurriculumCoverage(filters);
    
    expect(result).toEqual(mockCoverage);
    expect((service as any).repo.getCurriculumCoverage).toHaveBeenCalledWith(filters);
  });
  
  it('should export report and log audit', async () => {
    const filters = { program: 'B.Tech CSE' };

    const result = await service.exportReport(filters, 'admin1');
    
    expect(result).toHaveProperty('url');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'FACULTY_REPORT_EXPORTED' }));
  });
});
