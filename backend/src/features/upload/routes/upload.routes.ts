import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Secure all upload routes
router.use(protect);
// Students cannot upload
router.use(restrictTo(UserRole.ADMIN,  UserRole.MODERATOR));

router.post('/', uploadController.submitUpload);
router.get('/history', uploadController.getHistory);

export default router;
