import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();
const pdfController = new PdfController();

router.use(protect);

router.get('/history', pdfController.getUserHistory);
router.post('/history', pdfController.addHistory);
router.get('/:paperId', pdfController.getViewerData);
router.get('/progress/:paperId', pdfController.getProgress);
router.put('/progress/:paperId', pdfController.updateProgress);

export default router;
