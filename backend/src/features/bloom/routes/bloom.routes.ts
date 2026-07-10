import { Router } from 'express';
import { BloomController } from '../controllers/bloom.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new BloomController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);

router.put('/review/:paperId/:questionId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/:paperId', controller.getStatus);
router.get('/question/:paperId/:questionId', controller.getQuestionClassification);

export default router;
