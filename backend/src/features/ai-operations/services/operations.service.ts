import { OperationsRepository } from '../repositories/operations.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class OperationsService {
  private repo = new OperationsRepository();
  private auditService = new AuditLogService();

  async getOverview(userId: string) {
    await this.auditService.log({ userId, action: 'OPERATIONS_DASHBOARD_VIEWED', resourceType: 'SYSTEM' });
    return this.repo.getOverview();
  }

  async getPipelineHealth() {
    return this.repo.getPipelineHealth();
  }

  async getModelMetrics() {
    return this.repo.getModelMetrics();
  }

  async getQualityMetrics() {
    return this.repo.getQualityMetrics();
  }

  async getErrorAnalytics() {
    return this.repo.getErrorAnalytics();
  }
}
