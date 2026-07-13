import { Router } from 'express';
import { mobileOperationsController } from '../controllers/mobileOperations.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'OPERATIONS')); // Ops visibility

router.get('/overview', mobileOperationsController.getOverview);
router.get('/health', mobileOperationsController.getHealth);
router.get('/incidents', mobileOperationsController.getIncidents);
router.post('/incidents', mobileOperationsController.createIncident);
router.get('/reports', mobileOperationsController.getReports);

export default router;
