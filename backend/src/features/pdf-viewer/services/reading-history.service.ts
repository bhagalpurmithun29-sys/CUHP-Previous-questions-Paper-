import { ViewerRepository } from '../repositories/viewer.repository';
import { NotFoundError } from '../../../utils/ApiError';

export class ReadingHistoryService {
  private viewerRepository: ViewerRepository;

  constructor() {
    this.viewerRepository = new ViewerRepository();
  }

  async getPaperForViewer(paperId: string) {
    const paper = await this.viewerRepository.getPaperDetails(paperId);
    if (!paper) {
      throw new NotFoundError('Paper not found');
    }
    return paper;
  }

  async getProgress(userId: string, paperId: string) {
    const history = await this.viewerRepository.getReadingHistory(userId, paperId);
    return history;
  }

  async updateProgress(userId: string, paperId: string, progress: { lastPageRead: number; progressPercentage: number; timeSpent: number }) {
    const paper = await this.viewerRepository.getPaperDetails(paperId);
    if (!paper) {
      throw new NotFoundError('Paper not found');
    }
    return this.viewerRepository.updateReadingProgress(userId, paperId, progress);
  }

  async getUserHistory(userId: string) {
    return this.viewerRepository.getUserHistory(userId);
  }
}
