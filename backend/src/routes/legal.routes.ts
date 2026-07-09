import { Router } from 'express';
import {
  getPublishedPolicies,
  getPolicyBySlug,
  saveConsent,
  getConsent
} from '../controllers/legal.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Legal
 *   description: Legal and Compliance API
 */

router.get('/policies', getPublishedPolicies);
router.get('/policies/:slug', getPolicyBySlug);

// Allow guest or authenticated users to post/get consent
// Authentication is optional
router.post('/consent', (req, res, next) => {
  if (req.headers.authorization) return protect(req, res, next);
  next();
}, saveConsent);

router.get('/consent', (req, res, next) => {
  if (req.headers.authorization) return protect(req, res, next);
  next();
}, getConsent);

export default router;
