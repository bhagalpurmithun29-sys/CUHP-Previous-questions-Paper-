import { AnalyticsRepository } from '../repositories/analytics.repository';

export class AggregationService {
  private repo = new AnalyticsRepository();

  async getOverview() {
    const paperStats = await this.repo.getPaperOverview();
    
    let totalPapers = 0;
    let approvedPapers = 0;
    let pendingPapers = 0;
    let rejectedPapers = 0;
    let totalStorage = 0;

    paperStats.forEach((stat: any) => {
      totalPapers += stat.count;
      totalStorage += stat.totalSize || 0;
      if (stat._id === 'APPROVED') approvedPapers += stat.count;
      if (stat._id === 'PENDING') pendingPapers += stat.count;
      if (stat._id === 'REJECTED') rejectedPapers += stat.count;
    });

    return {
      totalPapers,
      approvedPapers,
      pendingPapers,
      rejectedPapers,
      totalStorageMB: Math.round(totalStorage / (1024 * 1024))
    };
  }

  async getUploadAnalytics() {
    const timeline = await this.repo.getUploadTimeline();
    return {
      timeline
    };
  }
  
  async getOcrAnalytics() {
     const stats = await this.repo.getOcrStats();
     return { stats };
  }

  async getAiAnalytics() {
     const stats = await this.repo.getAiStats();
     return { stats };
  }
}
