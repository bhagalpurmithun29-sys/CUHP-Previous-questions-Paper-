import { Router } from 'express';
import { aiFeedbackController } from '../controllers/aiFeedback.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

// Publicly available to all logged in users (Students, Faculty)
router.post('/', aiFeedbackController.submitFeedback);
router.get('/history', aiFeedbackController.getHistory);

// Restricted to Reviewers, Moderators, Admins
router.use(restrictTo('reviewer', 'moderator', 'admin'));
router.get('/queue', aiFeedbackController.getPendingQueue);
router.post('/evaluate', aiFeedbackController.evaluateFeedback);
router.get('/quality', aiFeedbackController.getQualityMetrics);
router.get('/reports', aiFeedbackController.getReports);

export default router;
