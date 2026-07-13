import { Router } from 'express';
import { processMessage, processSelection, summarizeDocument, getHistory, getCitations } from '../controllers/paperQA.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Ensure all Paper Q&A routes are protected

router.post('/message', processMessage);
router.post('/selection', processSelection);
router.post('/summarize', summarizeDocument);
router.get('/history/:paperId', getHistory);
router.get('/citations/:conversationId', getCitations);

export default router;
