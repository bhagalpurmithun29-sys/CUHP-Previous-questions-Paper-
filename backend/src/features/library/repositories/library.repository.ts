import { LibraryItem } from '../../../models/libraryItem.model';
import { ReadingHistory } from '../../../models/readingHistory.model';
import { DownloadHistory } from '../../../models/downloadHistory.model';
import { Bookmark } from '../../../models/bookmark.model';

export class LibraryRepository {
  async getSavedPapers(userId: string) {
    return Bookmark.find({ userId, type: 'PAPER', isDeleted: false })
      .populate('paperId', 'title format schoolId departmentId subjectId')
      .sort({ createdAt: -1 });
  }

  async getDownloadedPapers(userId: string) {
    return DownloadHistory.find({ userId, status: 'COMPLETED' })
      .populate('paperId', 'title format schoolId departmentId subjectId')
      .sort({ completedAt: -1 });
  }

  async getReadingProgress(userId: string) {
    return ReadingHistory.find({ userId })
      .populate('paperId', 'title format')
      .sort({ lastReadAt: -1 });
  }

  async getRecentlyViewed(userId: string, limit: number = 10) {
    return LibraryItem.find({ userId, type: 'RECENTLY_VIEWED' })
      .populate('paperId', 'title format')
      .sort({ updatedAt: -1 })
      .limit(limit);
  }
}
