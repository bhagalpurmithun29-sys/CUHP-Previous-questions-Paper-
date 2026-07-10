import { LibraryRepository } from '../repositories/library.repository';

export class LibraryService {
  private repository: LibraryRepository;

  constructor() {
    this.repository = new LibraryRepository();
  }

  async getLibraryOverview(userId: string) {
    const [saved, downloads, progress, recent] = await Promise.all([
      this.repository.getSavedPapers(userId),
      this.repository.getDownloadedPapers(userId),
      this.repository.getReadingProgress(userId),
      this.repository.getRecentlyViewed(userId, 5)
    ]);

    const totalTimeSpent = progress.reduce((acc, curr) => acc + (curr.totalTimeSpent || 0), 0);
    const completedPapers = progress.filter(p => p.progressPercentage >= 95).length;
    
    return {
      saved,
      downloads,
      progress,
      recent,
      statistics: {
        totalSaved: saved.length,
        totalDownloads: downloads.length,
        totalTimeSpent,
        completedPapers,
        activePapers: progress.length
      }
    };
  }

  async getRecent(userId: string) {
    return this.repository.getRecentlyViewed(userId, 20);
  }
  
  async getSaved(userId: string) {
    return this.repository.getSavedPapers(userId);
  }
  
  async getDownloads(userId: string) {
    return this.repository.getDownloadedPapers(userId);
  }
  
  async getProgress(userId: string) {
    return this.repository.getReadingProgress(userId);
  }
}
