import { BookmarkRepository } from '../repositories/bookmark.repository';
import { AppError } from '../../../utils/AppError';

export class ReadingListService {
  private repository: BookmarkRepository;

  constructor() {
    this.repository = new BookmarkRepository();
  }

  async createList(userId: string, data: any) {
    return this.repository.createReadingList({ ...data, userId });
  }

  async getLists(userId: string) {
    return this.repository.getReadingListsByUser(userId);
  }

  async updateList(id: string, userId: string, data: any) {
    const list = await this.repository.updateReadingList(id, userId, data);
    if (!list) throw new AppError('Reading list not found', 404);
    return list;
  }

  async removeList(id: string, userId: string) {
    const list = await this.repository.deleteReadingList(id, userId);
    if (!list) throw new AppError('Reading list not found', 404);
    return list;
  }
}
