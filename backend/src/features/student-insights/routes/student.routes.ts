import { Router } from 'express';
import { StudentInsightsController } from '../controllers/student.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new StudentInsightsController();

router.use(protect);
router.use(restrictTo('STUDENT'));

router.get('/dashboard', controller.getDashboard);
router.get('/topics', controller.getTopics);
router.get('/revision', controller.getRevision);
router.get('/profile', controller.getProfile);
router.get('/recommendations', controller.getRecommendations);

export default router;
