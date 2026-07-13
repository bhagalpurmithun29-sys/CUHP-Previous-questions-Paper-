import { Router } from 'express';
import { facultyCopilotController } from '../controllers/facultyCopilot.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Only Faculty, Admin, Moderators can access Copilot
router.use(protect);
router.use(restrictTo('faculty', 'admin', 'moderator'));

router.post('/chat', facultyCopilotController.processChat);
router.post('/analyze', facultyCopilotController.analyzeCurriculum);
router.post('/compare', facultyCopilotController.comparePapers);
router.get('/history', facultyCopilotController.getHistory);
router.get('/recommendations', facultyCopilotController.getRecommendations);

export default router;
