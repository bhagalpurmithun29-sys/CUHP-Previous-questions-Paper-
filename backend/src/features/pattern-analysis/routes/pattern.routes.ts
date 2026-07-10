import { Router } from 'express';
import { PatternController } from '../controllers/pattern.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new PatternController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);
router.put('/review/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.review);

router.get('/:paperId', controller.getStatus);
router.get('/blueprint/:paperId', controller.getStatus);
router.get('/similar/:paperId', controller.getSimilar);

export default router;
