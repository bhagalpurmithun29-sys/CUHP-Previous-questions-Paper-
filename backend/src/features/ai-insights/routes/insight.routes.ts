import { Router } from 'express';
import { InsightController } from '../controllers/insight.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new InsightController();

router.use(protect);

router.post('/process/:paperId', restrictTo('ADMIN', 'MODERATOR'), controller.process);
// Students can view insights if they have repository access (assumed handled by middleware/service later)
router.get('/:paperId', controller.getInsights);

export default router;
