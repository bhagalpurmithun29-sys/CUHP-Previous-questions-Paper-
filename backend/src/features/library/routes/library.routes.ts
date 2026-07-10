import { Router } from 'express';
import { LibraryController } from '../controllers/library.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new LibraryController();

router.use(protect);

router.get('/', controller.getLibraryOverview);
router.get('/recent', controller.getRecent);
router.get('/saved', controller.getSaved);
router.get('/downloads', controller.getDownloads);
router.get('/progress', controller.getProgress);
router.get('/recommendations', controller.getRecommendations);

export default router;
