import { Request, Response } from 'express';
import { moderationService } from '../services/moderation/moderation.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class ModerationController {
  
  public getQueue = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filters = {};
    if (req.query.status) {
      // @ts-ignore
      filters.approvalStatus = req.query.status;
    }
    if (req.query.assigneeId) {
      // @ts-ignore
      filters.reviewerId = req.query.assigneeId;
    }

    const queue = await moderationService.getQueue({ page, limit }, filters);
    res.status(200).json(new ApiResponse(200, queue, 'Moderation queue retrieved successfully'));
  });

  public getPaperDetails = catchAsync(async (req: Request, res: Response) => {
    // Relying on existing paper repo for details, but ideally this includes audit logs and dupes
    const { QuestionPaperRepository } = await import('../repositories/paper.repository');
    const repo = new QuestionPaperRepository();
    const paper = await repo.findById(req.params.paperId);
    
    if (!paper) {
      return res.status(404).json(new ApiResponse(404, null, 'Paper not found'));
    }
    
    // We would also fetch duplicate reports and activity timeline here.
    res.status(200).json(new ApiResponse(200, paper, 'Paper details retrieved'));
  });

  public approvePaper = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const { notes } = req.body;
    
    const result = await moderationService.approvePaper(req.params.paperId, userId, notes);
    res.status(200).json(new ApiResponse(200, result, 'Paper approved and published'));
  });

  public rejectPaper = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const result = await moderationService.rejectPaper({ paperId: req.params.paperId, ...req.body }, userId);
    res.status(200).json(new ApiResponse(200, result, 'Paper rejected'));
  });

  public requestChanges = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const result = await moderationService.requestChanges({ paperId: req.params.paperId, ...req.body }, userId);
    res.status(200).json(new ApiResponse(200, result, 'Changes requested from user'));
  });

  public assignModerator = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const { assigneeId } = req.body;
    const result = await moderationService.assignModerator(req.params.paperId, userId, assigneeId);
    res.status(200).json(new ApiResponse(200, result, 'Moderator assigned successfully'));
  });

  public bulkAction = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const result = await moderationService.handleBulkAction(req.body, userId);
    res.status(200).json(new ApiResponse(200, result, 'Bulk action processed'));
  });
}

export const moderationController = new ModerationController();
