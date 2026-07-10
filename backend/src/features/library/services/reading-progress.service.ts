import { ReadingHistory } from '../../../models/readingHistory.model';

export class ReadingProgressService {
  async updateProgress(userId: string, paperId: string, page: number, totalPages: number, timeSpentMs: number) {
    const percentage = totalPages > 0 ? Math.min(100, Math.round((page / totalPages) * 100)) : 0;
    
    return ReadingHistory.findOneAndUpdate(
      { userId, paperId },
      { 
        $set: { lastPageRead: page, progressPercentage: percentage, lastReadAt: new Date() },
        $inc: { totalTimeSpent: Math.round(timeSpentMs / 1000) }
      },
      { upsert: true, new: true }
    );
  }
}
