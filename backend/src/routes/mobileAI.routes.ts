import { Router } from 'express';
import { mobileAIController } from '../controllers/mobileAI.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Ensure all routes are protected

router.post('/voice/start', mobileAIController.startVoiceSession);
router.post('/voice/process', mobileAIController.processVoice);
router.post('/analyze', mobileAIController.executeAction);
router.get('/history', mobileAIController.getHistory);
router.post('/history/sync', mobileAIController.syncHistory);

// Map /chat to standard AI logic proxy for completeness in Mobile UI 
router.post('/chat', mobileAIController.processVoice); // Reusing process endpoint for stub

export default router;
