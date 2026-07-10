import { DownloadHistory } from '../../../models/downloadHistory.model';
import { Download } from '../../../models/download.model';
import { DownloadStatus } from '../../../interfaces/download.interface';

export class DownloadHistoryService {
  async logDownloadStart(userId: string, paperId: string, ip: string, userAgent: string, downloadUrl: string) {
    const history = new DownloadHistory({
      userId,
      paperId,
      status: DownloadStatus.INITIATED,
      ipAddress: ip,
      userAgent,
      downloadUrl,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours expiry
    });
    await history.save();
    return history;
  }

  async markDownloadStatus(historyId: string, status: DownloadStatus) {
    const history = await DownloadHistory.findByIdAndUpdate(historyId, { status }, { new: true });
    
    if (status === DownloadStatus.COMPLETED && history) {
      // Also track in general download analytics
      await Download.create({
        userId: history.userId,
        paperId: history.paperId,
        ipAddress: history.ipAddress,
      });
    }
    
    return history;
  }
  
  async getUserHistory(userId: string) {
    return DownloadHistory.find({ userId })
      .sort({ createdAt: -1 })
      .populate('paperId', 'title paperCode fileSize format')
      .exec();
  }

  async removeHistory(historyId: string, userId: string) {
    return DownloadHistory.findOneAndDelete({ _id: historyId, userId });
  }
}
