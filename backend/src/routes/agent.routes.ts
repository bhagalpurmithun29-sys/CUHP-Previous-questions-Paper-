import { Router } from 'express';
import { agentController } from '../controllers/agent.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// User routes
router.use(protect);
router.post('/query', agentController.query);

// Admin routes
router.get('/status', restrictTo('admin'), agentController.getStatus);
router.get('/list', restrictTo('admin'), agentController.getList);

export default router;
