import { Bookmark } from '../../../models/bookmark.model';
import { ReadingList } from '../../../models/readingList.model';

export class BookmarkRepository {
  async createBookmark(data: any) {
    return Bookmark.create(data);
  }

  async getBookmarksByUser(userId: string, query: any = {}) {
    return Bookmark.find({ userId, isDeleted: false, ...query })
      .populate('paperId', 'title fileUrl pdfUrl fileSize')
      .sort({ createdAt: -1 });
  }

  async updateBookmark(id: string, userId: string, data: any) {
    return Bookmark.findOneAndUpdate({ _id: id, userId, isDeleted: false }, data, { new: true });
  }

  async deleteBookmark(id: string, userId: string) {
    return Bookmark.findOneAndUpdate({ _id: id, userId }, { isDeleted: true, deletedAt: new Date() }, { new: true });
  }
  
  async createReadingList(data: any) {
    return ReadingList.create(data);
  }

  async getReadingListsByUser(userId: string) {
    return ReadingList.find({ userId, isDeleted: false })
      .populate({
        path: 'bookmarks',
        match: { isDeleted: false },
        populate: { path: 'paperId', select: 'title fileUrl' }
      })
      .sort({ createdAt: -1 });
  }

  async updateReadingList(id: string, userId: string, data: any) {
    return ReadingList.findOneAndUpdate({ _id: id, userId, isDeleted: false }, data, { new: true });
  }

  async deleteReadingList(id: string, userId: string) {
    return ReadingList.findOneAndUpdate({ _id: id, userId }, { isDeleted: true, deletedAt: new Date() }, { new: true });
  }
}
