import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { User } from '../../models/user.model';
import { DownloadHistory } from '../../models/downloadHistory.model';
import { Report } from '../../models/report.model';
import { AppError } from '../../utils/AppError';

export class AnalyticsService {
  private paperRepository = new QuestionPaperRepository();

  /**
   * Retrieves high-level KPIs for the Admin Dashboard
   */
  public async getAdminDashboardKPIs() {
    const [
      totalPapers,
      approvedPapers,
      pendingPapers,
      rejectedPapers,
      totalUsers,
      totalDownloads,
      openReports
    ] = await Promise.all([
      this.paperRepository.count({}),
      this.paperRepository.count({ status: 'APPROVED' }),
      this.paperRepository.count({ status: 'PENDING' }),
      this.paperRepository.count({ status: 'REJECTED' }),
      User.countDocuments(),
      DownloadHistory.countDocuments({ status: 'COMPLETED' }),
      Report.countDocuments({ status: 'OPEN' })
    ]);

    // Calculate basic trends (mocked for architecture placeholder)
    // In production, this would query the exact same aggregations but scoped to `{ createdAt: { $gte: lastWeek } }`
    return {
      kpis: {
        totalPapers: { value: totalPapers, trend: '+12%', isPositive: true },
        approvedPapers: { value: approvedPapers, trend: '+5%', isPositive: true },
        pendingReview: { value: pendingPapers, trend: '-2%', isPositive: true },
        rejectedPapers: { value: rejectedPapers, trend: '0%', isPositive: true },
        totalUsers: { value: totalUsers, trend: '+24%', isPositive: true },
        totalDownloads: { value: totalDownloads, trend: '+45%', isPositive: true },
        openReports: { value: openReports, trend: '+1%', isPositive: false }
      }
    };
  }

  /**
   * Aggregates upload and processing trends over time
   */
  public async getUploadTrends(days: number = 30) {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    // Group by Day
    const trends = await this.paperRepository.aggregate([
      { $match: { createdAt: { $gte: dateLimit } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalUploads: { $sum: 1 },
          approved: { $sum: { $cond: [{ $eq: ["$status", "APPROVED"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "REJECTED"] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return trends;
  }

  /**
   * Aggregates top downloading metrics
   */
  public async getDownloadAnalytics() {
    // Top 5 Most Downloaded Papers Overall
    const topPapers = await this.paperRepository.find(
      { status: 'APPROVED' }, 5, 1, { downloads: -1 }
    );

    // Group downloads by subject to find trending topics
    const trendingSubjects = await this.paperRepository.aggregate([
      { $match: { status: 'APPROVED' } },
      { $group: { _id: "$subjectId", totalDownloads: { $sum: "$downloads" } } },
      { $sort: { totalDownloads: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'subjects', // Adjust depending on actual collection name
          localField: '_id',
          foreignField: '_id',
          as: 'subject'
        }
      },
      { $unwind: "$subject" }
    ]);

    return {
      topPapers: topPapers.data,
      trendingSubjects
    };
  }

  /**
   * Generates Moderator Performance stats
   */
  public async getModeratorAnalytics(moderatorId?: string) {
    const filter = moderatorId ? { 'resolvedById': moderatorId } : { status: { $in: ['RESOLVED', 'CLOSED'] } };
    
    // Uses the Report collection as a proxy for moderation activity
    const resolutionStats = await Report.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$resolvedById",
          totalResolved: { $sum: 1 },
          avgResolutionTimeMs: { 
             $avg: { $subtract: ["$resolvedAt", "$createdAt"] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'moderator'
        }
      },
      { $unwind: "$moderator" },
      { $sort: { totalResolved: -1 } }
    ]);

    return resolutionStats;
  }
}

export const analyticsService = new AnalyticsService();
