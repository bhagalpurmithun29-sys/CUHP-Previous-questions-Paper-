import { Router } from 'express';
import { revisionController } from '../controllers/revision.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Ensure all endpoints are protected
router.use(protect);

router.get('/', revisionController.getDashboard);
router.post('/progress', revisionController.updateProgress);
router.post('/last-minute-plan', revisionController.generateLastMinutePlan);
router.get('/recommendations', revisionController.getRecommendations);

export default router;
