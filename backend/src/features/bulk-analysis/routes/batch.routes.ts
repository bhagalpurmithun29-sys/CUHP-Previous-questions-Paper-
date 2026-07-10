import { Router } from 'express';
import { BatchController } from '../controllers/batch.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new BatchController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR')); // Restrict to operators

router.post('/start', controller.start);
router.post('/cancel/:jobId', controller.cancel);
router.get('/status/:jobId', controller.status);
router.get('/history', controller.history);

export default router;
