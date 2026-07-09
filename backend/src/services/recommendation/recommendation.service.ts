import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { LibraryItem } from '../../models/libraryItem.model';
import { LibraryItemType } from '../../interfaces/library.interface';
import { DownloadHistory } from '../../models/downloadHistory.model';
import { DownloadStatus } from '../../interfaces/download.interface';
import { AppError } from '../../utils/AppError';
import { Types } from 'mongoose';

export class RecommendationService {
  private paperRepository = new QuestionPaperRepository();

  /**
   * Home Dashboard: Recommended For You (Authenticated) or Trending (Anonymous)
   */
  public async getHomeRecommendations(userId?: string, limit: number = 10) {
    if (!userId) {
      return this.getTrending(limit);
    }

    // Personalized Cold Start Strategy
    // 1. Fetch user's recent downloads & views to understand intent
    const recentActivity = await LibraryItem.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('paperId', 'subjectId courseId semester');

    if (!recentActivity || recentActivity.length === 0) {
      return this.getTrending(limit); // Fallback to trending
    }

    // 2. Extract weights based on recent behavior
    const subjects = new Set<string>();
    const courses = new Set<string>();
    const semesters = new Set<number>();

    (recentActivity as any[]).forEach((activity: any) => {
      const paper: any = activity.paperId;
      if (paper && typeof paper === 'object') {
        if (paper.subjectId) subjects.add(String(paper.subjectId));
        if (paper.courseId) courses.add(String(paper.courseId));
        if (paper.semesterId) semesters.add(Number(paper.semesterId));
      }
    });

    // 3. Query Engine: Match similar papers excluding already interacted ones
    const interactedIds = recentActivity.map(a => a.paperId._id);
    
    // In a real system, this would be a complex Aggregation Pipeline or ElasticSearch query
    // matching weights. Here we simulate a weighted query finding papers in same subject/semester.
    const recommendations = await this.paperRepository.find({
      _id: { $nin: interactedIds },
      status: 'APPROVED',
      $or: [
        { subjectId: { $in: Array.from(subjects) } },
        { courseId: { $in: Array.from(courses) } },
        { semester: { $in: Array.from(semesters) } }
      ]
    }, limit, 1, { downloads: -1, createdAt: -1 });

    return recommendations.data;
  }

  /**
   * Paper Details Page: Related Papers
   */
  public async getRelatedPapers(paperId: string, limit: number = 5) {
    const sourcePaper = await this.paperRepository.findById(paperId);
    if (!sourcePaper) throw new AppError('Paper not found', 404);

    // Rule: Same Subject + Same Exam Type OR Same Semester
    const related = await this.paperRepository.find({
      _id: { $ne: sourcePaper._id },
      status: 'APPROVED',
      subjectId: sourcePaper.subjectId,
      $or: [
        { examType: sourcePaper.examType },
        { semesterId: sourcePaper.semesterId }
      ]
    }, limit, 1, { downloads: -1 }); // Rank by popularity

    return related.data;
  }

  /**
   * Global Trending Engine (Freshness + Velocity)
   * Simulated via high downloads / views
   */
  public async getTrending(limit: number = 10) {
    // Ideally this uses a Redis cache that is refreshed hourly
    // Example: ZREVRANGE trending_papers 0 10
    
    // DB Fallback: Most downloaded + Most viewed combined sort
    const trending = await this.paperRepository.find(
      { status: 'APPROVED', visibility: 'PUBLIC' }, 
      limit, 
      1, 
      { downloads: -1, views: -1 }
    );
    return trending.data;
  }

  /**
   * "Because you downloaded X..." (Collaborative Filtering Placeholder)
   */
  public async getCollaborativeRecommendations(paperId: string, limit: number = 5) {
    // Strategy: Find users who downloaded this paper, then find what ELSE they downloaded.
    
    // 1. Find User IDs who downloaded this paper
    const downloads = await DownloadHistory.find({ paperId, status: DownloadStatus.COMPLETED }).select('userId').limit(50);
    const userIds = downloads.map(d => d.userId);

    if (userIds.length === 0) return [];

    // 2. Aggregate what else they downloaded, grouped by paper, sorted by count
    const alsoDownloaded = await DownloadHistory.aggregate([
      { $match: { userId: { $in: userIds }, paperId: { $ne: new Types.ObjectId(paperId) }, status: DownloadStatus.COMPLETED } },
      { $group: { _id: "$paperId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'questionpapers',
          localField: '_id',
          foreignField: '_id',
          as: 'paper'
        }
      },
      { $unwind: "$paper" }
    ]);

    return alsoDownloaded.map(item => item.paper);
  }

  /**
   * Analytics Tracking for Recommendations
   */
  public async trackClick(userId: string | undefined, paperId: string, source: string) {
    // In production, push to a timeseries DB or message queue.
    // e.g., 'HOME_TRENDING', 'RELATED_SIDEBAR', 'COLLABORATIVE'
    console.log(`[Analytics] Rec Engine Click: Paper ${paperId} via ${source} by ${userId || 'Anonymous'}`);
    return true;
  }
}

export const recommendationService = new RecommendationService();
