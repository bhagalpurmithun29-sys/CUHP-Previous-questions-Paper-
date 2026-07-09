import { Request, Response } from 'express';
import { backupService } from '../services/backup/backup.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { BackupType } from '../models/backup.model';

export class BackupController {

  public initiateBackup = catchAsync(async (req: Request, res: Response) => {
    const type = req.body.type || BackupType.FULL;
    // @ts-ignore
    const userId = req.user.id;
    
    const result = await backupService.initiateBackup(type, false, userId);
    res.status(202).json(new ApiResponse(202, result, 'Backup process initiated in the background'));
  });

  public getBackups = catchAsync(async (req: Request, res: Response) => {
    const result = await backupService.getBackups();
    res.status(200).json(new ApiResponse(200, result, 'Backups retrieved successfully'));
  });

  public getBackupById = catchAsync(async (req: Request, res: Response) => {
    const result = await backupService.getBackupById(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Backup retrieved'));
  });

  public restoreBackup = catchAsync(async (req: Request, res: Response) => {
    const { dryRun } = req.body;
    const result = await backupService.restoreBackup(req.params.id, dryRun);
    res.status(200).json(new ApiResponse(200, result, 'Restore action processed'));
  });

  public deleteBackup = catchAsync(async (req: Request, res: Response) => {
    await backupService.deleteBackup(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Backup deleted'));
  });
}

export const backupController = new BackupController();
