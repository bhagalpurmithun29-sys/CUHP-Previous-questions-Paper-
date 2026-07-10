import { Router } from 'express';
import { AnalysisController } from '../controllers/analysis.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new AnalysisController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
router.post('/reprocess/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.reprocess);
router.get('/queue', restrictTo('ADMIN', 'MODERATOR'), controller.getQueue);

router.get('/status/:paperId', controller.getStatus);
router.get('/result/:paperId', controller.getResult);

export default router;
