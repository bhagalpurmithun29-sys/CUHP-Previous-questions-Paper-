import { Router } from 'express';
import { duplicateController } from '../controllers/duplicate.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Duplicates
 *   description: Duplicate Detection and Resolution
 */

// All duplicate routes require Moderator/Admin privileges
router.use(protect);
router.use(restrictTo('MODERATOR', 'ADMIN'));

/**
 * @swagger
 * /api/duplicates/{paperId}:
 *   get:
 *     summary: Get duplicate report for a specific paper
 *     tags: [Duplicates]
 */
router.get('/:paperId', duplicateController.getReport);

/**
 * @swagger
 * /api/duplicates/recheck:
 *   post:
 *     summary: Trigger a manual duplicate check for a paper
 *     tags: [Duplicates]
 */
router.post('/recheck', duplicateController.recheck);

/**
 * @swagger
 * /api/duplicates/resolve:
 *   post:
 *     summary: Resolve a pending duplicate report
 *     tags: [Duplicates]
 */
router.post('/resolve', duplicateController.resolve);

export default router;
