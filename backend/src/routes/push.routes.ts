import { Router } from 'express';
import { pushController } from '../controllers/push.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.post('/subscribe', pushController.subscribe);
router.delete('/unsubscribe', pushController.unsubscribe);
router.get('/status', pushController.getStatus);
router.post('/test', pushController.testPush);

// Admin / System route to send targeted notifications
router.post('/send', restrictTo('SUPER_ADMIN', 'ADMIN'), pushController.sendPush);

export default router;
