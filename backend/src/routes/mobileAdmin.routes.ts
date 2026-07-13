import { Router } from 'express';
import { mobileAdminController } from '../controllers/mobileAdmin.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN')); // Restricted to administrators

router.get('/overview', mobileAdminController.getOverview);
router.get('/fleet', mobileAdminController.getFleet);
router.get('/deployment', mobileAdminController.getDeployment);
router.put('/configuration', mobileAdminController.updateConfiguration);
router.put('/policies', mobileAdminController.updatePolicies);
router.get('/health', mobileAdminController.getHealth);

export default router;
