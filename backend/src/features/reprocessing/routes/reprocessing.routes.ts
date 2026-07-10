import { Router } from 'express';
import { ReprocessingController } from '../controllers/reprocessing.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new ReprocessingController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR')); // Restrict to authorized operators

router.post('/start', controller.start);
router.post('/batch', controller.batch);
router.get('/history', controller.history);
router.get('/status/:jobId', controller.status);
router.post('/retry/:jobId', controller.retry);

export default router;
