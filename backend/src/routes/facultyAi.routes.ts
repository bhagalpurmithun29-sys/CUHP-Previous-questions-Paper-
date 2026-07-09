import { Router } from 'express';
import { facultyAIController } from '../controllers/facultyAi.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Only FACULTY and ADMIN can access these routes
router.use(protect);
router.use(restrictTo('faculty', 'admin'));

router.post('/generate', facultyAIController.generateQuestions);
router.post('/analyze', facultyAIController.analyzePaper);
router.post('/rubric', facultyAIController.generateRubric);

export default router;
