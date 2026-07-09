import { Router } from 'express';
import { OnboardingController } from '../controllers/onboarding.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', OnboardingController.getOnboarding);
router.post('/', OnboardingController.startOnboarding);
router.put('/progress', OnboardingController.updateProgress);
router.post('/complete', OnboardingController.completeOnboarding);

export default router;
