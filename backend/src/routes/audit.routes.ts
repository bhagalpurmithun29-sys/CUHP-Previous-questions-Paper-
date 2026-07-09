import { Router } from 'express';
import { auditController } from '../controllers/audit.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Enterprise Audit Logs & Activity Timeline APIs
 */

router.use(protect);

// User-level timeline (accessible by students for their own data)
router.get('/user/:userId', auditController.getUserTimeline);

// Admin / Moderator routes
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'MODERATOR'));

router.get('/', auditController.searchLogs);
router.get('/:id', auditController.getLogById);
router.get('/entity/:entityType/:entityId', auditController.getEntityTimeline);
router.post('/export', restrictTo('SUPER_ADMIN', 'ADMIN'), auditController.exportLogs);

export default router;
