import { StudentInsightsRepository } from '../repositories/student.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class StudentInsightsService {
  private repo = new StudentInsightsRepository();
  private auditService = new AuditLogService();

  async getDashboard(userId: string) {
    await this.auditService.log({ userId, action: 'STUDENT_DASHBOARD_VIEWED', resourceType: 'DASHBOARD' });
    return this.repo.getDashboard(userId);
  }

  async getTopics(userId: string) {
    return this.repo.getTopics(userId);
  }

  async getRevision(userId: string) {
    return this.repo.getRevision(userId);
  }

  async getProfile(userId: string) {
    return this.repo.getProfile(userId);
  }

  async getRecommendations(userId: string) {
    await this.auditService.log({ userId, action: 'RECOMMENDATIONS_GENERATED', resourceType: 'RECOMMENDATION' });
    return this.repo.getRecommendations(userId);
  }
}
