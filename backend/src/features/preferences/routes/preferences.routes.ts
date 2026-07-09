import { Router } from 'express';
import { PreferencesController } from '../controllers/preferences.controller';
import { protect } from '../../../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', PreferencesController.getPreferences);
router.put('/', PreferencesController.updatePreferences);
router.post('/reset', PreferencesController.resetPreferences);

export default router;
