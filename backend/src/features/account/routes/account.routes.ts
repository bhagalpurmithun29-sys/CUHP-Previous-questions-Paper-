import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', AccountController.getProfile);
router.put('/', AccountController.updateProfile);
router.put('/privacy', AccountController.updatePrivacy);
router.post('/avatar', AccountController.uploadAvatar);
router.delete('/avatar', AccountController.removeAvatar);
router.post('/export', AccountController.exportData);
router.delete('/', AccountController.deleteAccount);

export default router;
