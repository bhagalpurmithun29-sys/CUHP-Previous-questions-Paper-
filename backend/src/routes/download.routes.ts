import { Router } from 'express';
import { downloadController } from '../controllers/download.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Ensure all downloads honor authentication

router.get('/', downloadController.getDownloads);
router.post('/start', downloadController.startDownload);
router.post('/pause', downloadController.pauseDownload);
router.post('/resume', downloadController.resumeDownload);
router.delete('/:id', downloadController.cancelDownload);
router.get('/storage', downloadController.getStorage);

export default router;
