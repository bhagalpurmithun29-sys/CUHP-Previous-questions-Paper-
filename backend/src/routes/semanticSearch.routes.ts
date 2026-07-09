import { Router } from 'express';
import { hybridSearch, getSimilarPapers, triggerReindex, getIndexStatus } from '../controllers/semanticSearch.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';
import { UserRole } from '../enums/auth.enum';

const router = Router();

router.post('/', hybridSearch);
router.get('/similar/:paperId', getSimilarPapers);

// Admin Only routes
router.use(protect);
router.use(restrictTo(UserRole.ADMIN));

router.post('/reindex', triggerReindex);
router.get('/status', getIndexStatus);

export default router;
