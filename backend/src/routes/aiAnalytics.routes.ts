import { Router } from 'express';
import { aiAnalyticsController } from '../controllers/aiAnalytics.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Protect all analytics routes - only specific high-level roles should see system-wide aggregations
router.use(protect);
router.use(restrictTo('admin', 'executive', 'department_head'));

router.get('/overview', aiAnalyticsController.getOverview);
router.get('/features', aiAnalyticsController.getFeatures);
router.get('/roles', aiAnalyticsController.getRoles);
router.get('/departments', aiAnalyticsController.getDepartments);
router.get('/education', aiAnalyticsController.getEducationKPIs);
router.post('/export', aiAnalyticsController.exportReport);

export default router;
