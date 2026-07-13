import { Router } from 'express';
import { mobileTelemetryController } from '../controllers/mobileTelemetry.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN')); // Analytics is restricted

router.get('/overview', mobileTelemetryController.getOverview);
router.get('/sync', mobileTelemetryController.getSync);
router.get('/storage', mobileTelemetryController.getStorage);
router.get('/network', mobileTelemetryController.getNetwork);
router.post('/export', mobileTelemetryController.exportReport);

export default router;
