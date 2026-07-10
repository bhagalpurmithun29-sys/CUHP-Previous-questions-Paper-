import { AggregationService } from './aggregation.service';

export class RepositoryAnalyticsService {
  private aggregationService = new AggregationService();

  async getOverviewData() {
    return this.aggregationService.getOverview();
  }

  async getUploadData() {
    return this.aggregationService.getUploadAnalytics();
  }
  
  async getOcrData() {
    return this.aggregationService.getOcrAnalytics();
  }
  
  async getAiData() {
    return this.aggregationService.getAiAnalytics();
  }
}
