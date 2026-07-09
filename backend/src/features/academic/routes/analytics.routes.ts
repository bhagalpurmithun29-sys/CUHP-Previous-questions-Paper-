import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';
import { protect, restrictTo } from '../../auth/middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Protect all analytics endpoints
router.use(protect);
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MODERATOR, UserRole.FACULTY));

router.get('/overview', analyticsController.getOverview);
router.get('/growth', analyticsController.getGrowth);
router.get('/data-quality', analyticsController.getDataQuality);
router.get('/distribution', analyticsController.getDistribution);

// Report generation is restricted
router.post('/report', restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN), analyticsController.generateReport);

export default router;
