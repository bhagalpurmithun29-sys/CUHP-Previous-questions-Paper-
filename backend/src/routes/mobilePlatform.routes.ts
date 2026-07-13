import { Router } from 'express';
import { mobilePlatformController } from '../controllers/mobilePlatform.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'OPERATIONS')); // Executive visibility

router.get('/overview', mobilePlatformController.getOverview);
router.get('/health', mobilePlatformController.getHealth);
router.get('/dependencies', mobilePlatformController.getDependencies);
router.get('/readiness', mobilePlatformController.getReadiness);
router.post('/validate', mobilePlatformController.validateWorkflow);

export default router;
