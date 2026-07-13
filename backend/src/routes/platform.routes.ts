import { Router } from 'express';
import { platformController } from '../controllers/platform.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Platform Orchestration and Readiness APIs are highly restricted
router.use(protect);
router.use(restrictTo('super_admin', 'platform_ops', 'admin', 'executive'));

router.get('/overview', platformController.getOverview);
router.get('/health', platformController.getHealth);
router.get('/dependencies', platformController.getDependencies);
router.get('/workflows', platformController.getWorkflows);
router.get('/readiness', platformController.getReadiness);
router.post('/flags', platformController.updateFeatureFlag);
router.post('/validate', platformController.runValidation);

export default router;
