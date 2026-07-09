import { Router } from 'express';
import { SecurityController } from '../controllers/security.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/overview', SecurityController.getOverview);
router.get('/sessions', SecurityController.getSessions);
router.get('/devices', SecurityController.getDevices);
router.get('/login-history', SecurityController.getLoginHistory);
router.get('/events', SecurityController.getEvents);

router.delete('/sessions/:id', SecurityController.revokeSession);
router.delete('/sessions', SecurityController.revokeAllSessions);
router.delete('/devices/:id', SecurityController.revokeDevice);
router.patch('/devices/:id', SecurityController.renameDevice);

export default router;
