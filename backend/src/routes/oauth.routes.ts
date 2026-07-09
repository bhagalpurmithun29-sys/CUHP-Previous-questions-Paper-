import { Router } from 'express';
import { oAuthController } from '../controllers/oauth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// Public Routes
router.get('/providers', oAuthController.getProviders);
router.get('/:provider', oAuthController.getAuthorizationUrl);
router.get('/:provider/callback', oAuthController.handleCallback);

// Protected Routes (Account Linking)
router.use(protect);
router.post('/link/:provider', oAuthController.linkAccount);
router.delete('/unlink/:provider', oAuthController.unlinkAccount);

export default router;
