import { Router } from 'express';
import { OperationsController } from '../controllers/operations.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new OperationsController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR')); // Restrict to operations team

router.get('/overview', controller.getOverview);
router.get('/pipeline', controller.getPipelineHealth);
router.get('/models', controller.getModelMetrics);
router.get('/quality', controller.getQualityMetrics);
router.get('/errors', controller.getErrorAnalytics);

export default router;
