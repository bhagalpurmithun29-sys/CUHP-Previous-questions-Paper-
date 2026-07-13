import { Router } from 'express';
import { platformController } from '../controllers/platform.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'MODERATOR')); // Operation roles

router.get('/overview', platformController.getOverview);
router.get('/health', platformController.getHealth);
router.get('/dependencies', platformController.getDependencies);
router.get('/workflows', platformController.getWorkflows);
router.get('/readiness', platformController.getReadiness);
router.post('/validate', platformController.validatePlatform);

export default router;
