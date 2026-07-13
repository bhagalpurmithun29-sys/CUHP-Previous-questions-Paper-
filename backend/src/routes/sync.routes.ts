import { Router } from 'express';
import { syncController } from '../controllers/sync.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // All users can sync their own data

router.post('/start', syncController.startSync);
router.get('/status', syncController.getStatus);
router.get('/history', syncController.getHistory);
router.post('/retry', syncController.retrySync);
router.post('/conflicts/resolve', syncController.resolveConflicts);

export default router;
