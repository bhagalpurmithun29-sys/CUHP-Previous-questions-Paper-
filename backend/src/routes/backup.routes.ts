import { Router } from 'express';
import { backupController } from '../controllers/backup.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../enums/auth.enum';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Backups
 *   description: Backup, Restore & Disaster Recovery APIs
 */

router.use(protect);
router.use(restrictTo(UserRole.ADMIN)); // Only Super Admins can manage DB states

router.get('/', backupController.getBackups);
router.post('/', backupController.initiateBackup);
router.get('/:id', backupController.getBackupById);
router.post('/:id/restore', backupController.restoreBackup);
router.delete('/:id', backupController.deleteBackup);

export default router;
