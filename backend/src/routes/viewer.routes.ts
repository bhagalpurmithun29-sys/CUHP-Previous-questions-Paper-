import { Router } from 'express';
import { viewerController } from '../controllers/viewer.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Viewer
 *   description: Advanced PDF Viewer & Document Preview
 */

// Viewer endpoints require authentication
router.use(protect);

/**
 * @swagger
 * /api/viewer/{paperId}/session:
 *   get:
 *     summary: Creates a viewing session and returns a secure signed URL
 *     tags: [Viewer]
 */
router.get('/:paperId/session', viewerController.getSession);

/**
 * @swagger
 * /api/viewer/{paperId}/analytics:
 *   post:
 *     summary: Tracks user interactions within the viewer
 *     tags: [Viewer]
 */
router.post('/:paperId/analytics', viewerController.trackAnalytics);

export default router;
