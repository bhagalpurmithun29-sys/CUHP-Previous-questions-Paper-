import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Quality Assurance, Reporting & Feedback
 */

// All routes require auth
router.use(protect);

router.post('/', reportController.createReport);
router.get('/', reportController.getReports);
router.get('/:id', reportController.getReportDetails);
router.post('/:id/comment', reportController.addComment);

// Moderator/Admin only routes
router.use(restrictTo('MODERATOR', 'ADMIN'));

router.post('/:id/assign', reportController.assignReport);
router.post('/:id/resolve', reportController.resolveReport);
router.post('/:id/reopen', reportController.reopenReport);

export default router;
