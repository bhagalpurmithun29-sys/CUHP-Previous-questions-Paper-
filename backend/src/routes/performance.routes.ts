import { Router } from 'express';
import { performanceController } from '../controllers/performance.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'DEVELOPER')); 

router.get('/metrics', performanceController.getMetrics);
router.get('/summary', performanceController.getSummary);

export default router;
