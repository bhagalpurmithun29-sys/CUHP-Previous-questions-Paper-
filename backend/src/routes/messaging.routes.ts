import { Router } from 'express';
import { messagingController } from '../controllers/messaging.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/conversations', messagingController.getConversations);
router.get('/search', messagingController.searchMessages);
router.get('/:conversationId', messagingController.getConversationMessages);
router.post('/send', messagingController.sendMessage);
router.put('/read/:conversationId/:messageId?', messagingController.markAsRead);

export default router;
