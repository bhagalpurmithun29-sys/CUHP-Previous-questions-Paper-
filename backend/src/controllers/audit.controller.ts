import { Request, Response } from 'express';
import { auditService } from '../services/audit/audit.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class AuditController {

  public searchLogs = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    // Extract filters from query, omitting pagination
    const { page: _p, limit: _l, ...filters } = req.query;

    const result = await auditService.searchLogs(filters, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Audit logs retrieved'));
  });

  public getLogById = catchAsync(async (req: Request, res: Response) => {
    const result = await auditService.getLogById(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Audit log retrieved'));
  });

  public getUserTimeline = catchAsync(async (req: Request, res: Response) => {
    // If the requester is a student, ensure they can only query their own ID
    // @ts-ignore
    const requesterId = req.user.id;
    // @ts-ignore
    const requesterRole = req.user.role;
    const targetUserId = req.params.userId;

    if (requesterRole === 'STUDENT' && requesterId !== targetUserId) {
      return res.status(403).json(new ApiResponse(403, null, 'Forbidden'));
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await auditService.searchLogs({ userId: targetUserId }, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'User timeline retrieved'));
  });

  public getEntityTimeline = catchAsync(async (req: Request, res: Response) => {
    const { entityType, entityId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await auditService.searchLogs({ entityType, entityId }, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Entity timeline retrieved'));
  });

  public exportLogs = catchAsync(async (req: Request, res: Response) => {
    // Architectural placeholder for exporting background jobs
    const { format, filters } = req.body;
    
    // e.g. BullMQ queue insertion
    res.status(200).json(new ApiResponse(200, {
      jobId: `export_${Date.now()}`,
      status: 'PROCESSING',
      message: `Audit export in ${format} format queued successfully.`
    }, 'Export Queued'));
  });
}

export const auditController = new AuditController();
