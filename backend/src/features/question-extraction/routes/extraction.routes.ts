import { Router } from 'express';
import { ExtractionController } from '../controllers/extraction.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new ExtractionController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);
router.get('/queue', restrictTo('ADMIN', 'MODERATOR'), controller.getQueue);
router.put('/review/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/status/:paperId', controller.getStatus);
router.get('/questions/:paperId', controller.getQuestions);

export default router;
