import { Router } from 'express';
import { MigrationController } from '../controllers/migration.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new MigrationController();

router.use(protect, restrictTo('ADMIN'));

router.post('/import', controller.import);
router.post('/export', controller.export);
router.post('/migration', controller.migrate);
router.post('/backup', controller.backup);
router.post('/restore', controller.restore);
router.post('/sync', controller.sync);
router.get('/history', controller.getHistory);

export default router;
