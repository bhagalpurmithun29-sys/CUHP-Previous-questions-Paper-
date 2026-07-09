import { DownloadHistory } from '../../models/downloadHistory.model';
import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { storageService } from '../storage/storage.service';
import { AppError } from '../../utils/AppError';
import { PaperApprovalStatus, PaperVisibility } from '../../interfaces/paper.interface';
import { DownloadStatus } from '../../interfaces/download.interface';
import { ActivityLog } from '../../models/activityLog.model';

export class DownloadService {
  private paperRepository = new QuestionPaperRepository();

  /**
   * Validates access and generates a secure signed URL for the user to download the file.
   */
  public async generateDownloadUrl(paperId: string, userId: string, reqInfo: any): Promise<{ url: string, historyId: string }> {
    const paper = await this.paperRepository.findById(paperId);
    
    if (!paper) {
      throw new AppError('Question Paper not found', 404);
    }

    // Access Control: Must be Approved & Public
    // Note: Moderators and Admins could bypass this rule in a full RBAC implementation,
    // but for the standard student flow:
    if (paper.approvalStatus !== PaperApprovalStatus.APPROVED || paper.visibility !== PaperVisibility.PUBLIC) {
      // @ts-ignore
      if (!reqInfo.userIsAdmin && !reqInfo.userIsModerator) {
         throw new AppError('This paper is not available for public download.', 403);
      }
    }

    // 1. Generate Secure Signed URL (Valid for 15 minutes)
    const expirationSeconds = 15 * 60; 
    let secureUrl = '';
    
    // In local storage mode, we might just return the standard path, 
    // but the StorageService abstraction handles signed URLs gracefully.
    try {
      secureUrl = await storageService.getSignedUrl(paper.storagePath, expirationSeconds);
    } catch (e: any) {
       // Fallback for LocalStorageProvider which doesn't natively support signed URLs
       secureUrl = storageService.getPublicUrl(paper.storagePath);
    }

    // 2. Log History
    const history = await DownloadHistory.create({
      userId,
      paperId: paper._id,
      status: DownloadStatus.INITIATED,
      ipAddress: reqInfo.ip,
      userAgent: reqInfo.userAgent,
      browser: 'Parsed-Browser-Placeholder',
      os: 'Parsed-OS-Placeholder',
      countryPlaceholder: 'IN',
      expiresAt: new Date(Date.now() + expirationSeconds * 1000),
      downloadUrl: secureUrl // Store URL strictly for tracking active links/revocation if needed
    });

    // 3. Update Global Analytics (Fire and Forget)
    this.paperRepository.incrementAnalytics(paperId, 'downloadCount').catch(console.error);

    // 4. Audit Log
    ActivityLog.create({
      userId,
      action: 'DOWNLOAD', // @ts-ignore
      targetId: paperId,
      targetModel: 'QuestionPaper'
    }).catch(console.error);

    return { url: secureUrl, historyId: String(history._id) };
  }

  /**
   * Finalizes the download history status (e.g., triggered by frontend once download finishes)
   */
  public async confirmDownload(historyId: string, status: DownloadStatus): Promise<void> {
    await DownloadHistory.findByIdAndUpdate(historyId, { status });
  }

  /**
   * Fetches paginated download history for a user
   */
  public async getUserHistory(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      DownloadHistory.find({ userId })
        .populate('paperId', 'title subjectId academicYear originalFileName thumbnailUrl')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      DownloadHistory.countDocuments({ userId })
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Gets recent unique downloads for a user dashboard snippet
   */
  public async getRecentDownloads(userId: string, limit: number = 5) {
    // Basic aggregation to get distinct recent papers
    const recent = await DownloadHistory.aggregate([
      { $match: { userId: userId as any, status: DownloadStatus.COMPLETED } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$paperId", lastDownloaded: { $first: "$createdAt" } } },
      { $sort: { lastDownloaded: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'questionpapers',
          localField: '_id',
          foreignField: '_id',
          as: 'paper'
        }
      },
      { $unwind: "$paper" }
    ]);
    
    return recent.map(r => ({
      ...r.paper,
      lastDownloadedAt: r.lastDownloaded
    }));
  }

  /**
   * Deletes a download history record
   */
  public async deleteHistory(historyId: string, userId: string): Promise<boolean> {
    const record = await DownloadHistory.findOneAndDelete({ _id: historyId, userId });
    return !!record;
  }
}

export const downloadService = new DownloadService();
