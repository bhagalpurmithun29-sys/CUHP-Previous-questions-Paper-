import { Router } from 'express';
import { versionController } from '../controllers/version.controller';

const router = Router();

// Public routes for PWA checks
router.get('/version', versionController.getVersion);
router.get('/status', versionController.getStatus);

export default router;
