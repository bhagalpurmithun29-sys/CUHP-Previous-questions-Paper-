import { Router } from 'express';
import { chat, getProviders, getUsageStats, getConversations, getConversationById, deleteConversation } from '../controllers/ai.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../enums/auth.enum';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: AI Gateway
 *   description: Multi-LLM Enterprise Gateway
 */

router.use(protect); // All AI routes require authentication

router.get('/providers', getProviders);
router.post('/chat', chat);

router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversationById);
router.delete('/conversations/:id', deleteConversation);

// Admin Analytics Route
router.get('/usage', restrictTo(UserRole.ADMIN), getUsageStats);

export default router;
