import { Request, Response, NextFunction } from 'express';
import { importExportService } from '../services/import-export.service';

export class ImportExportController {
  
  async exportData(req: Request, res: Response, next: NextFunction) {
    try {
      const { entityType, format, ...filters } = req.query;
      const result = await importExportService.exportData(entityType as string, format as string, filters);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async validateImport(req: Request, res: Response, next: NextFunction) {
    try {
      const { entityType, records } = req.body;
      const result = await importExportService.validateImport(entityType, records);
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async commitImport(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const { entityType, validRecords } = req.body;
      const result = await importExportService.commitImport(entityType, validRecords, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async executeBulkAction(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const { action, entityType, ids, updateData } = req.body;
      const result = await importExportService.executeBulkAction(action, entityType, ids, updateData, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async getImportHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await importExportService.getImportHistory();
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }

  async rollbackImport(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;
      const { transactionId } = req.body;
      const result = await importExportService.rollbackImport(transactionId, userId, req.ip || '', req.get('User-Agent') || '');
      res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const importExportController = new ImportExportController();
