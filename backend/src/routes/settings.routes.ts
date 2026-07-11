import { Router } from 'express';
import { settingsController } from '../controllers/settings.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: System Settings
 *   description: Enterprise System Configuration APIs
 */

// Public endpoint for feature flags & maintenance status
router.get('/public', settingsController.getPublicSettings);

// Admin / Super Admin routes
router.use(protect);
router.use(restrictTo( 'ADMIN'));

router.get('/', settingsController.getAllSettings);
router.put('/', settingsController.updateSetting);
router.get('/export', settingsController.exportSettings);
router.post('/import', settingsController.importSettings);

export default router;
