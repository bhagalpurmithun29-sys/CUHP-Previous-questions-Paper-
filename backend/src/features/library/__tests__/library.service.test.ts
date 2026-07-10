import { LibraryService } from '../services/library.service';
import { LibraryRepository } from '../repositories/library.repository';

jest.mock('../repositories/library.repository');

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    service = new LibraryService();
  });

  it('should get library overview including statistics', async () => {
    LibraryRepository.prototype.getSavedPapers = jest.fn().mockResolvedValue([{ _id: '1' }]);
    LibraryRepository.prototype.getDownloadedPapers = jest.fn().mockResolvedValue([]);
    LibraryRepository.prototype.getReadingProgress = jest.fn().mockResolvedValue([
      { totalTimeSpent: 3600, progressPercentage: 100 }
    ]);
    LibraryRepository.prototype.getRecentlyViewed = jest.fn().mockResolvedValue([]);

    const result = await service.getLibraryOverview('user1');
    
    expect(result.statistics.totalSaved).toBe(1);
    expect(result.statistics.totalTimeSpent).toBe(3600);
    expect(result.statistics.completedPapers).toBe(1);
  });
});
