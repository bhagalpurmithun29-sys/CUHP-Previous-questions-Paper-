import { Request, Response, NextFunction } from 'express';
import { MigrationService } from '../services/migration.service';
import { BackupService } from '../services/backup.service';
import { RestoreService } from '../services/restore.service';
import { SyncService } from '../services/sync.service';

export class MigrationController {
  private migrationService = new MigrationService();
  private backupService = new BackupService();
  private restoreService = new RestoreService();
  private syncService = new SyncService();

  import = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.migrationService.importData(req.body, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  export = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.migrationService.exportData(req.body, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  migrate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dryRun = req.query.dryRun === 'true';
      const data = await this.migrationService.executeMigration(req.body, req.user!.id || req.user!._id as any, dryRun);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  backup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.backupService.createBackup(req.body, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  restore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.restoreService.restoreData(req.body, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  sync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.syncService.syncRepository(req.body, req.user!.id || req.user!._id as any);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const data = await this.migrationService.getHistory(page);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
