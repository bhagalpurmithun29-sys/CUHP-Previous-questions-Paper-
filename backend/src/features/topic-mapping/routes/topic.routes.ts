import { Router } from 'express';
import { TopicController } from '../controllers/topic.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new TopicController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);

router.put('/review/:paperId/:questionId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/:paperId', controller.getStatus);
router.get('/question/:paperId/:questionId', controller.getQuestionMapping);

export default router;
