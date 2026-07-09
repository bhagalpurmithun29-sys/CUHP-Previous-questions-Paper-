import { Router } from 'express';
import { moderationController } from '../controllers/moderation.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Moderation
 *   description: Review and Moderation Workflow
 */

// All moderation routes require Moderator/Admin privileges
router.use(protect);
router.use(restrictTo('MODERATOR', 'ADMIN'));

/**
 * @swagger
 * /api/moderation/queue:
 *   get:
 *     summary: Get the pending review queue
 *     tags: [Moderation]
 */
router.get('/queue', moderationController.getQueue);

/**
 * @swagger
 * /api/moderation/bulk:
 *   post:
 *     summary: Perform an action on multiple papers
 *     tags: [Moderation]
 */
router.post('/bulk', moderationController.bulkAction);

/**
 * @swagger
 * /api/moderation/{paperId}:
 *   get:
 *     summary: Get detailed paper info for review (including dupes & timeline)
 *     tags: [Moderation]
 */
router.get('/:paperId', moderationController.getPaperDetails);

/**
 * @swagger
 * /api/moderation/{paperId}/approve:
 *   post:
 *     summary: Approve and publish a paper
 *     tags: [Moderation]
 */
router.post('/:paperId/approve', moderationController.approvePaper);

/**
 * @swagger
 * /api/moderation/{paperId}/reject:
 *   post:
 *     summary: Reject a paper
 *     tags: [Moderation]
 */
router.post('/:paperId/reject', moderationController.rejectPaper);

/**
 * @swagger
 * /api/moderation/{paperId}/request-changes:
 *   post:
 *     summary: Request changes from the uploader
 *     tags: [Moderation]
 */
router.post('/:paperId/request-changes', moderationController.requestChanges);

/**
 * @swagger
 * /api/moderation/{paperId}/assign:
 *   post:
 *     summary: Assign a specific moderator to review
 *     tags: [Moderation]
 */
router.post('/:paperId/assign', moderationController.assignModerator);

export default router;
