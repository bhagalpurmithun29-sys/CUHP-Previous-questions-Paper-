import { Router } from 'express';
import { VersionController } from '../controllers/version.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new VersionController();

// Anyone authenticated can view version history
router.get('/:paperId', protect, controller.getVersionHistory);
router.get('/:paperId/compare', protect, controller.compareVersions);
router.get('/:paperId/:versionId', protect, controller.getVersionById);

// Only specific roles can restore or approve
router.post('/:paperId/restore', protect, restrictTo('MODERATOR', 'ADMIN'), controller.restoreVersion);
router.post('/:paperId/approve', protect, restrictTo('MODERATOR', 'ADMIN'), controller.approveVersion);

export default router;
