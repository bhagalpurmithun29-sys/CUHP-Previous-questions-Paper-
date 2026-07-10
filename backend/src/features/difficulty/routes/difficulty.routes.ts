import { Router } from 'express';
import { DifficultyController } from '../controllers/difficulty.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new DifficultyController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);

router.put('/review/:paperId/:questionId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/:paperId', controller.getStatus);
router.get('/question/:paperId/:questionId', controller.getQuestionAnalysis);

export default router;
