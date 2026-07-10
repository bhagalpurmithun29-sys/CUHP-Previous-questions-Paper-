import { Router } from 'express';
import { DownloadController } from '../controllers/download.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();
const downloadController = new DownloadController();

router.use(protect);

router.post('/batch', downloadController.initiateBatch);
router.post('/:paperId', downloadController.initiateSingle);
router.put('/:historyId/status', downloadController.updateStatus);
router.get('/history', downloadController.getHistory);
router.get('/offline', downloadController.getOfflineLibrary);
router.delete('/history/:id', downloadController.deleteHistory);

export default router;
