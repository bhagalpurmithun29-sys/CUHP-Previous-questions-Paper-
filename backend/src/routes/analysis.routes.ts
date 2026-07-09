import { Router } from 'express';
import { analysisController } from '../controllers/analysis.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public routes for analysis viewing
router.get('/paper/:paperId', analysisController.getAnalysis);
router.get('/subject/:subjectId', analysisController.getSubjectAnalysis);

// Protected routes
router.post('/reanalyze/:paperId', protect, analysisController.triggerReanalysis);

export default router;
