import { Router } from 'express';
import { TrendController } from '../controllers/trend.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new TrendController();

router.use(protect);
router.use(restrictTo('ADMIN', 'MODERATOR'));

router.get('/overview', controller.getOverview);
router.get('/topic', controller.getTopic);
router.get('/bloom', controller.getBloom);
router.get('/difficulty', controller.getDifficulty);

export default router;
