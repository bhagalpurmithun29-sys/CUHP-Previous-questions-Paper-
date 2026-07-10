import { Request, Response, NextFunction } from 'express';
import { VersionService } from '../services/version.service';
import { ComparisonService } from '../services/comparison.service';
import { RestoreService } from '../services/restore.service';
import { RevisionService } from '../services/revision.service';

export class VersionController {
  private versionService = new VersionService();
  private comparisonService = new ComparisonService();
  private restoreService = new RestoreService();
  private revisionService = new RevisionService();

  getVersionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.versionService.getVersionHistory(req.params.paperId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getVersionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.versionService.getVersionById(req.params.versionId);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  compareVersions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const { v1, v2 } = req.query;
      const data = await this.comparisonService.compareVersions(req.params.paperId, v1 as string, v2 as string, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  restoreVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.restoreService.restoreFileVersion(req.params.paperId, req.body.versionId, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  approveVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.revisionService.approveVersion(req.params.paperId, req.body.versionId, userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
