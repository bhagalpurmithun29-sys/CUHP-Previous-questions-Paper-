import { Router } from 'express';
import { AdoptionController } from '../controllers/adoption.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/tours', AdoptionController.getAdoptionState);
router.post('/progress', AdoptionController.updateProgress);
router.post('/reset', AdoptionController.resetAdoption);
router.get('/whats-new', AdoptionController.getWhatsNew);

export default router;
