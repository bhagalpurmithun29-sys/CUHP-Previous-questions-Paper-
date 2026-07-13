import { Router } from 'express';
import { aiSafetyController } from '../controllers/aiSafety.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint for the Gateway to validate things
router.post('/validate-request', protect, aiSafetyController.validateRequest);
router.post('/validate-response', protect, aiSafetyController.validateResponse);

// Admin / Moderator dashboard routes
router.use(protect);
router.use(restrictTo('admin', 'moderator'));

router.get('/policies', aiSafetyController.getPolicies);
router.get('/events', aiSafetyController.getEvents);
router.get('/moderation', aiSafetyController.getModerationQueue);
router.post('/moderate', aiSafetyController.moderateItem);

export default router;
