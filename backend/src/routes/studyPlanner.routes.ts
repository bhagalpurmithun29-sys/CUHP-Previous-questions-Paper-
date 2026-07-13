import { Router } from 'express';
import { studyPlannerController } from '../controllers/studyPlanner.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// All study planner routes require authentication (Student only per requirements)
router.use(protect);

router.get('/dashboard', studyPlannerController.getDashboard);
router.get('/weekly', studyPlannerController.getWeekly);
router.get('/monthly', studyPlannerController.getMonthly);
router.get('/revision', studyPlannerController.getRevision);

router.post('/goals', studyPlannerController.createGoal);
router.put('/goals/:goalId', studyPlannerController.updateGoal);
router.delete('/goals/:goalId', studyPlannerController.deleteGoal);

router.get('/recommendations', studyPlannerController.getRecommendations);

export default router;
