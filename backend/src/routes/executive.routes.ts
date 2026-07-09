import { Router } from 'express';
import { executiveController } from '../controllers/executive.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Only ADMIN and SUPER_ADMIN can access executive intelligence
router.use(protect);
router.use(restrictTo('admin'));

router.get('/dashboard', executiveController.getDashboard);
router.get('/insights', executiveController.getInsights);
router.post('/report', executiveController.generateReport);

export default router;
