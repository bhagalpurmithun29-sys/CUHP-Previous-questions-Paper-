import { BookmarkService } from '../services/bookmark.service';
import { BookmarkRepository } from '../repositories/bookmark.repository';

jest.mock('../repositories/bookmark.repository');

describe('BookmarkService', () => {
  let service: BookmarkService;

  beforeEach(() => {
    service = new BookmarkService();
  });

  it('should add a new bookmark', async () => {
    BookmarkRepository.prototype.createBookmark = jest.fn().mockResolvedValue({ _id: '1', userId: 'user1', type: 'PAPER' });

    const result = await service.addBookmark('user1', { paperId: 'paper1', type: 'PAPER' });
    
    expect(result.type).toBe('PAPER');
    expect(BookmarkRepository.prototype.createBookmark).toHaveBeenCalledWith({ paperId: 'paper1', type: 'PAPER', userId: 'user1' });
  });

  it('should retrieve bookmarks', async () => {
    BookmarkRepository.prototype.getBookmarksByUser = jest.fn().mockResolvedValue([{ _id: '1' }]);
    
    const results = await service.getBookmarks('user1');
    expect(results).toHaveLength(1);
  });
});
