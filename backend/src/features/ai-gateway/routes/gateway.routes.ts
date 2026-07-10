import { Router } from 'express';
import { GatewayController } from '../controllers/gateway.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new GatewayController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR')); // Internal service or Admin only

router.post('/chat', controller.chat);
router.get('/providers', controller.getProviders);

export default router;
