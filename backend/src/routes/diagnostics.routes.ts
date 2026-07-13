import { Router } from 'express';
import { diagnosticsController } from '../controllers/diagnostics.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Ensure all routes are protected

// Users can report their capabilities
router.post('/report', diagnosticsController.reportCapabilities);

// Admins can see aggregates
router.get('/overview', restrictTo('SUPER_ADMIN', 'ADMIN'), diagnosticsController.getOverview);
router.get('/capabilities', restrictTo('SUPER_ADMIN', 'ADMIN'), diagnosticsController.getCapabilities);
router.get('/compatibility', restrictTo('SUPER_ADMIN', 'ADMIN'), diagnosticsController.getCompatibility);
router.get('/health', restrictTo('SUPER_ADMIN', 'ADMIN'), diagnosticsController.getHealth);

export default router;
