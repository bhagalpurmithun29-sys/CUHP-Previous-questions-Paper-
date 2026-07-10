import { DownloadHistory } from '../../../models/downloadHistory.model';
import { DownloadStatus } from '../../../interfaces/download.interface';

export class OfflineLibraryService {
  async getOfflineLibrary(userId: string) {
    // Get all unique completed downloads for the user
    return DownloadHistory.find({ userId, status: DownloadStatus.COMPLETED })
      .sort({ createdAt: -1 })
      .populate('paperId')
      .exec();
  }
}
