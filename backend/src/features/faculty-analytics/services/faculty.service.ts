import { FacultyAnalyticsRepository } from '../repositories/faculty.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class FacultyAnalyticsService {
  private repo = new FacultyAnalyticsRepository();
  private auditService = new AuditLogService();

  async getOverview(filters: any, userId: string) {
    const data = await this.repo.getOverview(filters);
    await this.auditService.log({ userId, action: 'FACULTY_DASHBOARD_VIEWED', resourceType: 'DASHBOARD' });
    return data;
  }

  async getCurriculumCoverage(filters: any) {
    return this.repo.getCurriculumCoverage(filters);
  }

  async getAssessmentQuality(filters: any) {
    return this.repo.getAssessmentQuality(filters);
  }

  async getBloomDistribution(filters: any) {
    return this.repo.getBloomDistribution(filters);
  }

  async getDifficultyDistribution(filters: any) {
    return this.repo.getDifficultyDistribution(filters);
  }

  async getComparison(filters: any) {
    return this.repo.getComparison(filters);
  }

  async exportReport(filters: any, userId: string) {
    await this.auditService.log({ userId, action: 'FACULTY_REPORT_EXPORTED', resourceType: 'REPORT' });
    return { url: 'https://storage.cuhp.edu/reports/export-1234.pdf' };
  }
}
