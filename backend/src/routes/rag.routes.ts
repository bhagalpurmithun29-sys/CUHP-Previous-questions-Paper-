import { Router } from 'express';
import { ragController } from '../controllers/rag.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Protected user routes
router.use(protect);
router.post('/query', ragController.query);

// Admin / Moderator routes
router.post('/reindex', restrictTo('admin', 'moderator'), ragController.reindex);
router.get('/status', restrictTo('admin', 'moderator'), ragController.getStatus);

export default router;
