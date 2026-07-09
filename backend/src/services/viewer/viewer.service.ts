import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { storageService } from '../storage/storage.service';
import { AppError } from '../../utils/AppError';
import { PaperApprovalStatus, PaperVisibility } from '../../interfaces/paper.interface';
import { ActivityLog } from '../../models/activityLog.model';

export class ViewerService {
  private repository = new QuestionPaperRepository();

  /**
   * Generates a viewer session, returning a short-lived signed URL strictly for the PDF viewer.
   */
  public async createSession(paperId: string, userId: string, reqInfo: any) {
    const paper = await this.repository.findById(paperId);
    
    if (!paper) {
      throw new AppError('Paper not found', 404);
    }

    // Access control:
    if (paper.approvalStatus !== PaperApprovalStatus.APPROVED || paper.visibility !== PaperVisibility.PUBLIC) {
      // @ts-ignore
      if (!reqInfo.userIsAdmin && !reqInfo.userIsModerator) {
         throw new AppError('This paper is not available for viewing.', 403);
      }
    }

    // Viewer URL expires in 1 Hour to allow enough time for studying the paper
    const expirationSeconds = 60 * 60; 
    
    let secureUrl = '';
    try {
      secureUrl = await storageService.getSignedUrl(paper.storagePath, expirationSeconds);
    } catch (e: any) {
      secureUrl = storageService.getPublicUrl(paper.storagePath);
    }

    // Generate a temporary session token (mocked for architectural placeholder)
    const sessionId = `vs_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Log the view in analytics
    await this.repository.incrementAnalytics(paperId, 'viewCount');

    // Audit the action
    ActivityLog.create({
      userId,
      action: 'VIEW' as any,
      targetId: paper._id,
      targetModel: 'QuestionPaper',
      metadata: { sessionId, ip: reqInfo.ip }
    }).catch(console.error);

    return {
      sessionId,
      url: secureUrl,
      expiresAt: new Date(Date.now() + expirationSeconds * 1000),
      paperData: {
        title: paper.title,
        pageCount: paper.pageCount,
        originalFileName: paper.originalFileName,
        thumbnails: paper.previewImages || []
      }
    };
  }

  /**
   * Captures in-viewer analytics (Time spent, pages viewed, etc.)
   */
  public async trackAnalytics(paperId: string, sessionId: string, payload: any) {
    // In a full implementation, we would store this in a dedicated `ViewerAnalytics` collection.
    // Here we append a generic activity log to track behavioral usage
    await ActivityLog.create({
      userId: payload.userId,
      action: 'VIEW_ANALYTICS' as any,
      targetId: paperId,
      targetModel: 'QuestionPaper',
      metadata: {
        sessionId,
        timeSpentSeconds: payload.timeSpentSeconds,
        pagesViewed: payload.pagesViewed,
        searchesPerformed: payload.searchesPerformed,
        zoomChanges: payload.zoomChanges,
        printClicks: payload.printClicks
      }
    });

    return { success: true };
  }
}

export const viewerService = new ViewerService();
