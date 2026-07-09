import { Router } from 'express';
import { studyPlannerController } from '../controllers/studyPlanner.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// All study planner routes require authentication
router.use(protect);

router.get('/', studyPlannerController.getActivePlan);
router.post('/', studyPlannerController.generatePlan);
router.put('/progress', studyPlannerController.updateTaskProgress);
router.get('/recommendations', studyPlannerController.getRecommendations);

export default router;
