import { Router } from 'express';
import { aiAdminController } from '../controllers/aiAdmin.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Strict protection: Only AI Admins, Platform Ops, and Super Admins
router.use(protect);
router.use(restrictTo('admin', 'platform_ops', 'super_admin'));

router.get('/overview', aiAdminController.getOverview);
router.get('/health', aiAdminController.getHealth);

router.get('/alerts', aiAdminController.getAlerts);
router.post('/alerts/:id/acknowledge', aiAdminController.acknowledgeAlert);

router.get('/configuration', aiAdminController.getConfiguration);
router.put('/configuration', aiAdminController.updateConfiguration);

export default router;
