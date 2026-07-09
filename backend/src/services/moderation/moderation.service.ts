import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { AppError } from '../../utils/AppError';
import { PaperApprovalStatus, PaperVisibility } from '../../interfaces/paper.interface';
import { RejectActionDTO, RequestChangesDTO, BulkActionDTO } from '../../interfaces/moderation.interface';
import { ActivityLog } from '../../models/activityLog.model';
import { logger } from '../../utils/logger';

export class ModerationService {
  private repository = new QuestionPaperRepository();

  /**
   * Tracks moderation actions in the Audit Log
   */
  private async logAction(userId: string, action: string, paperId: string, oldStatus: string, newStatus: string, metadata: any = {}) {
    await ActivityLog.create({
      userId,
      // @ts-ignore Since ActivityLog enum is restricted, we'll cast to bypass strict checking for this simulation
      action: action, 
      targetId: paperId,
      targetModel: 'QuestionPaper',
      metadata: {
        oldStatus,
        newStatus,
        ...metadata
      }
    });
  }

  /**
   * Simulates sending a notification (Email / In-App)
   */
  private sendNotification(userId: string, title: string, message: string) {
    logger.info(`[NOTIFICATION to ${userId}] ${title}: ${message}`);
  }

  /**
   * Approve a pending question paper
   */
  public async approvePaper(paperId: string, moderatorId: string, notes?: string) {
    const paper = await this.repository.findById(paperId);
    if (!paper) throw new AppError('Paper not found', 404);

    const oldStatus = paper.approvalStatus;
    
    // Approval makes it public by default in this flow
    const updated = await this.repository.update(paperId, {
      approvalStatus: PaperApprovalStatus.APPROVED,
      visibility: PaperVisibility.PUBLIC,
      approverId: moderatorId as any,
      approvedAt: new Date()
    });

    await this.logAction(moderatorId, 'APPROVE', paperId, oldStatus, PaperApprovalStatus.APPROVED, { notes });
    this.sendNotification(paper.uploaderId.toString(), 'Upload Approved', `Your question paper "${paper.title}" has been approved and published.`);

    return updated;
  }

  /**
   * Reject a pending question paper
   */
  public async rejectPaper(data: RejectActionDTO, moderatorId: string) {
    const paper = await this.repository.findById(data.paperId);
    if (!paper) throw new AppError('Paper not found', 404);

    const oldStatus = paper.approvalStatus;
    const finalReason = data.reason === 'CUSTOM_REASON' ? data.customReasonText : data.reason;

    const updated = await this.repository.update(data.paperId, {
      approvalStatus: PaperApprovalStatus.REJECTED,
      approverId: moderatorId as any,
      rejectedReason: finalReason
    });

    await this.logAction(moderatorId, 'REJECT', data.paperId, oldStatus, PaperApprovalStatus.REJECTED, { reason: finalReason, notes: data.notes });
    this.sendNotification(paper.uploaderId.toString(), 'Upload Rejected', `Your question paper "${paper.title}" was rejected. Reason: ${finalReason}`);

    return updated;
  }

  /**
   * Request changes from the student
   */
  public async requestChanges(data: RequestChangesDTO, moderatorId: string) {
    const paper = await this.repository.findById(data.paperId);
    if (!paper) throw new AppError('Paper not found', 404);

    const oldStatus = paper.approvalStatus;

    const updated = await this.repository.update(data.paperId, {
      approvalStatus: PaperApprovalStatus.CHANGES_REQUESTED,
      reviewerId: moderatorId as any,
      rejectedReason: data.changesRequested.join(', ') // Using rejectedReason field loosely to store required changes
    });

    await this.logAction(moderatorId, 'REQUEST_CHANGES', data.paperId, oldStatus, PaperApprovalStatus.CHANGES_REQUESTED, { changes: data.changesRequested, notes: data.notes });
    this.sendNotification(paper.uploaderId.toString(), 'Changes Requested', `Your upload "${paper.title}" requires changes: ${data.changesRequested.join(', ')}`);

    return updated;
  }

  /**
   * Assign a moderator to a paper
   */
  public async assignModerator(paperId: string, assignerId: string, assigneeId: string) {
    const paper = await this.repository.findById(paperId);
    if (!paper) throw new AppError('Paper not found', 404);

    const updated = await this.repository.update(paperId, {
      reviewerId: assigneeId as any,
      approvalStatus: PaperApprovalStatus.UNDER_REVIEW // Move to active review
    });

    await this.logAction(assignerId, 'ASSIGN', paperId, paper.approvalStatus, PaperApprovalStatus.UNDER_REVIEW, { assigneeId });
    this.sendNotification(assigneeId, 'New Assignment', `You have been assigned to review "${paper.title}"`);

    return updated;
  }

  /**
   * Fetch the moderation queue with server-side pagination
   */
  public async getQueue(pagination: { page: number, limit: number }, filters: any = {}) {
    // Only fetch papers that aren't finalized (Approved/Rejected)
    const baseFilters = {
      isDeleted: false,
      approvalStatus: { $in: [PaperApprovalStatus.PENDING, PaperApprovalStatus.UNDER_REVIEW, PaperApprovalStatus.CHANGES_REQUESTED] },
      ...filters
    };
    
    return await this.repository.search('', baseFilters, pagination);
  }

  /**
   * Bulk action handler
   */
  public async handleBulkAction(data: BulkActionDTO, moderatorId: string) {
    const results = [];
    
    for (const paperId of data.paperIds) {
      try {
        switch (data.action) {
          case 'APPROVE':
            await this.approvePaper(paperId, moderatorId);
            results.push({ paperId, status: 'SUCCESS' });
            break;
          case 'REJECT':
            if (!data.reason) throw new Error('Reason required for bulk rejection');
            await this.rejectPaper({ paperId, reason: data.reason }, moderatorId);
            results.push({ paperId, status: 'SUCCESS' });
            break;
          case 'ASSIGN':
            if (!data.assigneeId) throw new Error('Assignee required');
            await this.assignModerator(paperId, moderatorId, data.assigneeId);
            results.push({ paperId, status: 'SUCCESS' });
            break;
          case 'ARCHIVE':
            await this.repository.update(paperId, { visibility: PaperVisibility.ARCHIVED });
            results.push({ paperId, status: 'SUCCESS' });
            break;
        }
      } catch (error: any) {
        results.push({ paperId, status: 'FAILED', error: error.message });
      }
    }

    return results;
  }
}

export const moderationService = new ModerationService();
