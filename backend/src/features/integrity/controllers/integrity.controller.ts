import { Request, Response, NextFunction } from 'express';
import { DuplicateService } from '../services/duplicate.service';
import { MergeService } from '../services/merge.service';
import { RepositoryHealthService } from '../services/health.service';
import { SimilarityService } from '../services/similarity.service';

export class IntegrityController {
  private duplicateService = new DuplicateService();
  private mergeService = new MergeService();
  private healthService = new RepositoryHealthService();
  private similarityService = new SimilarityService();

  getDuplicates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const resolved = req.query.resolved === 'true';
      const data = await this.duplicateService.getDuplicates(page, 20, resolved);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getHealthReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.healthService.getHealthScore();
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  mergePapers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.mergeService.mergePapers(req.body.reportId, userId as string, req.body.notes);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  scanPaper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.similarityService.detectDuplicates(req.body.paperId);
      res.status(200).json({ success: true, message: 'Scan complete' });
    } catch (error) { next(error); }
  };
}
