import { Request, Response, NextFunction } from 'express';
import { BatchService } from '../services/batch.service';

export class BatchController {
  private service = new BatchService();

  start = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.startJob(req.body, req.user?.id!);
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  };

  history = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getHistory();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  status = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getStatus(req.params.jobId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.cancelJob(req.params.jobId, req.user?.id!);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
