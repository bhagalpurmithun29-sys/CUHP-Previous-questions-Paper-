import { Router } from 'express';
import { IntegrityController } from '../controllers/integrity.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new IntegrityController();

router.use(protect, restrictTo('MODERATOR', 'ADMIN'));

router.get('/duplicates', controller.getDuplicates);
router.get('/report', controller.getHealthReport);
router.post('/merge', controller.mergePapers);
router.post('/scan', controller.scanPaper);

export default router;
