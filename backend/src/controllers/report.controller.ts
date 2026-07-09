import { Request, Response } from 'express';
import { reportService } from '../services/report/report.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { ReportStatus } from '../interfaces/report.interface';

export class ReportController {

  public createReport = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await reportService.createReport(req.body, req.user.id);
    res.status(201).json(new ApiResponse(201, result, 'Report submitted successfully'));
  });

  public getReports = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const role = req.user.role;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    let query = { ...req.query };
    
    // If student, only show their own reports
    if (role === 'STUDENT') {
       // @ts-ignore
       query = { ...query, reporterId: req.user.id };
    }

    const result = await reportService.getReports(query, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Reports retrieved'));
  });

  public getReportDetails = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await reportService.getReportDetails(req.params.id, req.user.id, req.user.role);
    res.status(200).json(new ApiResponse(200, result, 'Report details retrieved'));
  });

  public addComment = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const { text, isInternalNote } = req.body; // @ts-ignore
    const result = await reportService.addComment(req.params.id, req.user.id, text, isInternalNote);
    res.status(201).json(new ApiResponse(201, result, 'Comment added'));
  });

  public assignReport = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const assigneeId = req.body.assigneeId || req.user.id; 
    const result = await reportService.assignReport(req.params.id, assigneeId);
    res.status(200).json(new ApiResponse(200, result, 'Report assigned'));
  });

  public resolveReport = catchAsync(async (req: Request, res: Response) => {
    const { resolutionNotes } = req.body;
    // @ts-ignore
    const result = await reportService.updateStatus(req.params.id, ReportStatus.RESOLVED, req.user.id, resolutionNotes);
    res.status(200).json(new ApiResponse(200, result, 'Report resolved'));
  });

  public reopenReport = catchAsync(async (req: Request, res: Response) => {
    const result = await reportService.updateStatus(req.params.id, ReportStatus.REOPENED);
    res.status(200).json(new ApiResponse(200, result, 'Report reopened'));
  });

}

export const reportController = new ReportController();
