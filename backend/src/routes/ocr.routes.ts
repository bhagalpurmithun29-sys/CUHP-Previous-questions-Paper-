import { Router } from 'express';
import { ocrController } from '../controllers/ocr.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Ensure all endpoints are protected
router.use(protect);

router.post('/process/:paperId', restrictTo('admin', 'moderator'), ocrController.processPaper);
router.post('/reprocess/:paperId', restrictTo('admin', 'moderator'), ocrController.processPaper);
router.get('/status/:paperId', ocrController.getStatus);
router.get('/result/:paperId', ocrController.getResult);
router.put('/review/:paperId', restrictTo('admin', 'moderator'), ocrController.updateReview);

export default router;
