import { Router } from 'express';
import { searchController } from '../controllers/search.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

// Secure all search endpoints
router.use(protect);

router.get('/', searchController.globalSearch);
router.get('/autocomplete', searchController.autocomplete);
router.get('/history', searchController.getHistory);
router.delete('/history', searchController.clearHistory);
router.get('/saved', searchController.getSavedSearches);
router.post('/saved', searchController.saveSearch);

export default router;
