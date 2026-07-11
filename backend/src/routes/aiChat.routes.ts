import { Router } from 'express';
import { sendMessage, streamMessage, getHistory, getConversation, deleteConversation } from '../controllers/aiChat.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // All AI Chat routes require authentication

router.post('/message', sendMessage);
router.post('/stream', streamMessage);
router.get('/history', getHistory);
router.get('/conversation/:id', getConversation);
router.delete('/conversation/:id', deleteConversation);

export default router;
