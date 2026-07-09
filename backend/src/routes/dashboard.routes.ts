import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', dashboardController.getDashboardData);
router.get('/profile', dashboardController.getProfile);
router.get('/activity', dashboardController.getActivity);
router.get('/statistics', dashboardController.getStatistics);

export default router;
