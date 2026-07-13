import { Router } from 'express';
import { communicationAdminController } from '../controllers/communicationAdmin.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Highly restricted to top-level admins
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));

router.get('/overview', communicationAdminController.getOverview);
router.get('/health', communicationAdminController.getHealth);
router.get('/alerts', communicationAdminController.getAlerts);
router.get('/configuration', communicationAdminController.getConfiguration);
router.put('/configuration', communicationAdminController.updateConfiguration);
router.post('/export', communicationAdminController.exportData);

export default router;
