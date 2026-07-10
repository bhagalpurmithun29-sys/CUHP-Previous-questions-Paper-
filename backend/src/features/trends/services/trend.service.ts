import { TrendRepository } from '../repositories/trend.repository';
import { AuditLogService } from '../../audit/services/audit.service';

export class TrendService {
  private repo = new TrendRepository();
  private auditService = new AuditLogService();

  async getOverview(filters: any) {
     return {
         totalPapersAnalyzed: 142,
         yearsCovered: 4,
         topGrowingTopic: 'Machine Learning',
         mostStableTopic: 'Data Structures',
         overallDifficultyTrend: 'Increasing'
     };
  }

  async getTopicTrends(filters: any) {
      return this.repo.aggregateTopicTrends(filters);
  }

  async getBloomTrends(filters: any) {
      return this.repo.aggregateBloomTrends(filters);
  }

  async getDifficultyTrends(filters: any) {
      return this.repo.aggregateDifficultyTrends(filters);
  }
}
