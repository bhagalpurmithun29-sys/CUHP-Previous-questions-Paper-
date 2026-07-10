import { Router } from 'express';
import { OcrController } from '../controllers/ocr.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new OcrController();

router.use(protect);

router.post('/start/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.startOcr);
router.post('/retry/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.startOcr);

router.get('/status/:paperId', controller.getOcrStatus);
router.get('/text/:paperId', controller.getOcrText);

router.put('/review/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.reviewOcr);
router.get('/stats/overview', restrictTo('MODERATOR', 'ADMIN'), controller.getOcrStats);

export default router;
