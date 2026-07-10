import { Router } from 'express';
import { QualityController } from '../controllers/quality.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new QualityController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR')); // Only admins and moderators can review

router.get('/queue', controller.getQueue);
router.get('/metrics', controller.getMetrics);
router.post('/review', controller.submitReview);
router.post('/reprocess', controller.requestReprocess);

export default router;
