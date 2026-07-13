import { Router } from 'express';
import { deviceController } from '../controllers/device.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // Ensure all routes are protected

// Devices
router.get('/devices', deviceController.getDevices);
router.post('/devices/register', deviceController.registerDevice);
router.put('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.removeDevice);

// Sessions
router.get('/sessions', deviceController.getSessions);
router.delete('/sessions/others', deviceController.removeOtherSessions);
router.delete('/sessions/:id', deviceController.removeSession);

// WebAuthn
router.post('/webauthn/register', deviceController.webauthnRegister);
router.post('/webauthn/authenticate', deviceController.webauthnAuthenticate);

export default router;
