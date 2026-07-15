import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';
import { uploadPaperMiddleware } from '../../../middlewares/upload.middleware';

const router = Router();

// Secure all upload routes
router.use(protect);

router.post('/', uploadPaperMiddleware.single('file'), uploadController.submitUpload);
router.get('/history', uploadController.getHistory);

export default router;
