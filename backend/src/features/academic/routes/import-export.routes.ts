import { Router } from 'express';
import { importExportController } from '../controllers/import-export.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Secure all endpoints. Exporters must be at least Faculty/Moderator
router.use(protect);

router.get('/export', restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MODERATOR), importExportController.exportData);

// Imports and Bulk actions are Admin only
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.post('/import/validate', importExportController.validateImport);
router.post('/import/commit', importExportController.commitImport);
router.get('/import/history', importExportController.getImportHistory);
router.post('/import/rollback', importExportController.rollbackImport);

router.post('/bulk', importExportController.executeBulkAction);

export default router;
