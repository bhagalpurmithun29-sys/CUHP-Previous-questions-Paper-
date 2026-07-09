import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics & Insights Platform APIs
 */

// All analytics routes require at least Moderator access
router.use(protect);
router.use(restrictTo('MODERATOR', 'ADMIN'));

router.get('/dashboard', analyticsController.getDashboardKPIs);
router.get('/uploads', analyticsController.getUploads);
router.get('/downloads', analyticsController.getDownloads);
router.get('/moderators', analyticsController.getModerators);

// Admin-only exports
router.post('/export', restrictTo('ADMIN'), analyticsController.exportReport);

export default router;
