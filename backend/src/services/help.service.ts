import { HelpArticle, ArticleStatus } from '../models/helpArticle.model';
import { AppError } from '../utils/AppError';

export class HelpService {
  async getCategories() {
    // Returns categories with article counts
    const categories = await HelpArticle.aggregate([
      { $match: { status: ArticleStatus.PUBLISHED } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    return categories.map(c => ({ name: c._id, count: c.count }));
  }

  async searchArticles(query: string, category?: string) {
    const matchQuery: any = { status: ArticleStatus.PUBLISHED };
    if (category) matchQuery.category = category;
    
    if (query) {
      matchQuery.$text = { $search: query };
      const articles = await HelpArticle.find(matchQuery, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .select('title slug excerpt category readTimeMinutes viewCount')
        .limit(20);
      return articles;
    }

    return await HelpArticle.find(matchQuery)
      .sort({ createdAt: -1 })
      .select('title slug excerpt category readTimeMinutes viewCount')
      .limit(20);
  }

  async getArticleBySlug(slug: string) {
    const article = await HelpArticle.findOne({ slug, status: ArticleStatus.PUBLISHED })
      .populate('authorId', 'firstName lastName avatarUrl role');
    
    if (!article) throw new AppError('Article not found', 404);

    // Increment views async
    HelpArticle.updateOne({ _id: article._id }, { $inc: { viewCount: 1 } }).exec();
    
    // Find related articles (same category)
    const related = await HelpArticle.find({ 
      category: article.category, 
      _id: { $ne: article._id },
      status: ArticleStatus.PUBLISHED 
    })
    .select('title slug')
    .limit(3);

    return { article, related };
  }

  async getFaqs() {
    return await HelpArticle.find({ isFaq: true, status: ArticleStatus.PUBLISHED })
      .select('title content category slug')
      .sort({ category: 1, title: 1 });
  }

  async submitFeedback(slug: string, isHelpful: boolean, comment?: string) {
    const article = await HelpArticle.findOne({ slug });
    if (!article) throw new AppError('Article not found', 404);

    const updateField = isHelpful ? 'helpfulCount' : 'notHelpfulCount';
    await HelpArticle.updateOne({ _id: article._id }, { $inc: { [updateField]: 1 } });
    
    // If comment exists, usually we'd store it in a Feedback model.
    return { success: true };
  }
}

export const helpService = new HelpService();
