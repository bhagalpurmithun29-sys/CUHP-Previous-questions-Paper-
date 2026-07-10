import { BookmarkRepository } from '../repositories/bookmark.repository';

export class BookmarkSyncService {
  private repository: BookmarkRepository;

  constructor() {
    this.repository = new BookmarkRepository();
  }

  async syncOfflineChanges(userId: string, localChanges: any[]) {
    const results = [];
    for (const change of localChanges) {
      if (change.action === 'CREATE') {
        const doc = await this.repository.createBookmark({ ...change.data, userId });
        results.push(doc);
      } else if (change.action === 'UPDATE') {
        const doc = await this.repository.updateBookmark(change.id, userId, change.data);
        results.push(doc);
      } else if (change.action === 'DELETE') {
        const doc = await this.repository.deleteBookmark(change.id, userId);
        results.push(doc);
      }
    }
    return results;
  }
}
