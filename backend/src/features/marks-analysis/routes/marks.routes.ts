import { Router } from 'express';
import { MarksController } from '../controllers/marks.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new MarksController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);
router.put('/review/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/:paperId', controller.getStatus);
router.get('/summary/:paperId', controller.getStatus);

export default router;
