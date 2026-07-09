import { Router } from 'express';
import { downloadController } from '../controllers/download.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Downloads
 *   description: Student Download & Access System
 */

// All download operations require the user to be fully authenticated
router.use(protect);

/**
 * @swagger
 * /api/downloads/history:
 *   get:
 *     summary: Get user's paginated download history
 *     tags: [Downloads]
 */
router.get('/history', downloadController.getHistory);

/**
 * @swagger
 * /api/downloads/recent:
 *   get:
 *     summary: Get user's recent unique downloads
 *     tags: [Downloads]
 */
router.get('/recent', downloadController.getRecent);

/**
 * @swagger
 * /api/downloads/history/{id}:
 *   delete:
 *     summary: Delete a specific download history record
 *     tags: [Downloads]
 */
router.delete('/history/:id', downloadController.deleteHistoryRecord);

/**
 * @swagger
 * /api/downloads/{paperId}/url:
 *   get:
 *     summary: Generate a secure, temporary signed URL for file download
 *     tags: [Downloads]
 */
router.get('/:paperId/url', downloadController.getDownloadUrl);

/**
 * @swagger
 * /api/downloads/confirm:
 *   post:
 *     summary: Confirm the completion/failure status of an active download
 *     tags: [Downloads]
 */
router.post('/confirm', downloadController.confirmStatus);

export default router;
