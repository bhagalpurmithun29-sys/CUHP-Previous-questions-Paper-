import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/report.service';
import { WorkflowService } from '../services/workflow.service';
import { EscalationService } from '../services/escalation.service';

export class ModerationController {
  private reportService = new ReportService();
  private workflowService = new WorkflowService();
  private escalationService = new EscalationService();

  createReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.reportService.createReport(userId as string, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reportService.getReports(req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.reportService.getReportById(req.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
  
  updateReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.reportService.updateReport(req.params.id, userId as string, req.body);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  assignModerator = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.workflowService.assignModerator(req.params.id, req.body.assigneeId, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  approveReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.workflowService.approveReport(req.params.id, userId as string, req.body.notes);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  rejectReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.workflowService.rejectReport(req.params.id, userId as string, req.body.notes);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  escalateReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.escalationService.escalateReport(req.params.id, userId as string, req.body.reason);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
