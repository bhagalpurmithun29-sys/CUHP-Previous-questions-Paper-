import { Router } from 'express';
import { mfaController } from '../controllers/mfa.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// All MFA routes require authentication
router.use(protect);

router.post('/setup', mfaController.setup);
router.post('/enable', mfaController.enable);
router.post('/verify', mfaController.verify);
router.post('/recover', mfaController.recover);
router.post('/disable', mfaController.disable);

router.get('/trusted-devices', mfaController.getTrustedDevices);
router.delete('/trusted-devices/:id', mfaController.revokeTrustedDevice);

export default router;
