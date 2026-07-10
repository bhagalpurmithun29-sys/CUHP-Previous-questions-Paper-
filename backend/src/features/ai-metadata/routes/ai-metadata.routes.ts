import { Router } from 'express';
import { AIMetadataController } from '../controllers/ai-metadata.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new AIMetadataController();

router.use(protect);

router.post('/process/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.processMetadata);
router.post('/retry/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.processMetadata);

router.get('/:paperId', controller.getMetadata);
router.get('/stats/overview', restrictTo('MODERATOR', 'ADMIN'), controller.getStats);

router.put('/review/:paperId', restrictTo('MODERATOR', 'ADMIN'), controller.reviewMetadata);

export default router;
