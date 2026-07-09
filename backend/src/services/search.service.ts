import { SearchRepository } from '../repositories/search.repository';
import { SearchQueryDto } from '../interfaces/search.interface';
import { Types } from 'mongoose';
import { AppError } from '../utils/AppError';

export class SearchService {
  private searchRepository: SearchRepository;

  constructor() {
    this.searchRepository = new SearchRepository();
  }

  async search(params: SearchQueryDto, userId?: string | Types.ObjectId, ipAddress?: string, userAgent?: string) {
    const { results, total } = await this.searchRepository.globalSearch(params);

    // Log analytics asynchronously
    if (params.query && params.query.length >= 3) {
      this.searchRepository.logSearchAnalytics({
        userId,
        query: params.query,
        entityType: params.type,
        filters: params.filters,
        resultsCount: total,
        ipAddress,
        userAgent
      }).catch(err => console.error('Error logging search analytics:', err));
    }

    // Save recent search for authenticated users
    if (userId && params.query && params.query.length >= 3) {
      this.searchRepository.saveSearch(userId, params.query, params.filters)
        .catch(err => console.error('Error saving recent search:', err));
    }

    return {
      results,
      meta: {
        total,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: Math.ceil(total / (params.limit || 10))
      }
    };
  }

  async autocomplete(query: string) {
    if (!query || query.length < 2) {
      return [];
    }
    return await this.searchRepository.autocomplete(query);
  }

  async getRecentSearches(userId: string | Types.ObjectId) {
    if (!userId) throw new AppError('User ID is required', 400);
    return await this.searchRepository.getRecentSearches(userId);
  }

  async getPinnedSearches(userId: string | Types.ObjectId) {
    if (!userId) throw new AppError('User ID is required', 400);
    return await this.searchRepository.getPinnedSearches(userId);
  }

  async togglePinSearch(userId: string | Types.ObjectId, searchId: string) {
    const search = await this.searchRepository.togglePinSearch(userId, searchId);
    if (!search) {
      throw new AppError('Search record not found', 404);
    }
    return search;
  }

  async clearRecentSearches(userId: string | Types.ObjectId) {
    if (!userId) throw new AppError('User ID is required', 400);
    return await this.searchRepository.deleteRecentSearches(userId);
  }

  async getTrendingSearches() {
    // Note: Assuming SearchAnalytics and QuestionPaper are required for this method, 
    // we would normally import them at the top. To avoid missing imports, we'll require them inline.
    const SearchAnalytics = require('../models/searchAnalytics.model').SearchAnalytics;
    const QuestionPaper = require('../models/paper.model').QuestionPaper;

    const trendingKeywords = await SearchAnalytics.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: '$query', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const trendingPapers = await QuestionPaper.find({ isDeleted: false, visibility: 'PUBLIC' })
      .sort({ downloadCount: -1, viewCount: -1 })
      .limit(5)
      .select('title subjectId paperId');

    return {
      keywords: trendingKeywords.map((k: any) => k._id).filter((k: any) => k),
      papers: trendingPapers
    };
  }

  async saveSearchManually(userId: string | Types.ObjectId, query: string, filters: any) {
    if (!userId) throw new AppError('User ID is required', 400);
    return await this.searchRepository.saveSearch(userId, query, filters);
  }
}
