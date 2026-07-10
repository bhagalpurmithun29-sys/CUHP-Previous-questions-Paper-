import { BookmarkRepository } from '../repositories/bookmark.repository';
import { AppError } from '../../../utils/AppError';

export class BookmarkService {
  private repository: BookmarkRepository;

  constructor() {
    this.repository = new BookmarkRepository();
  }

  async addBookmark(userId: string, data: any) {
    return this.repository.createBookmark({ ...data, userId });
  }

  async getBookmarks(userId: string, filters: any = {}) {
    return this.repository.getBookmarksByUser(userId, filters);
  }

  async updateBookmark(id: string, userId: string, data: any) {
    const bookmark = await this.repository.updateBookmark(id, userId, data);
    if (!bookmark) throw new AppError('Bookmark not found', 404);
    return bookmark;
  }

  async removeBookmark(id: string, userId: string) {
    const bookmark = await this.repository.deleteBookmark(id, userId);
    if (!bookmark) throw new AppError('Bookmark not found', 404);
    return bookmark;
  }
}
