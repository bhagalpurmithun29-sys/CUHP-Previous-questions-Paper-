import { ReadingHistoryService } from './reading-history.service';

export class PdfService {
  private readingHistoryService: ReadingHistoryService;

  constructor() {
    this.readingHistoryService = new ReadingHistoryService();
  }

  async getViewerData(userId: string, paperId: string) {
    const paper = await this.readingHistoryService.getPaperForViewer(paperId);
    const progress = await this.readingHistoryService.getProgress(userId, paperId);
    return {
      paper,
      progress: progress || null
    };
  }
}
