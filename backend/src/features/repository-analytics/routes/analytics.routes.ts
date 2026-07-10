import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new AnalyticsController();

router.use(protect, restrictTo('ADMIN', 'MODERATOR'));

router.get('/overview', controller.getOverview);
router.get('/uploads', controller.getUploads);
router.get('/ocr', controller.getOcr);
router.get('/ai', controller.getAi);

export default router;
