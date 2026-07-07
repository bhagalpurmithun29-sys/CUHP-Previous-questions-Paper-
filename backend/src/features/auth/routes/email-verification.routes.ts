import { Router } from 'express';
import { EmailVerificationController } from '../controllers/email-verification.controller';
import { verifyEmailValidator, resendVerificationValidator } from '../validators/verify-email.validator';
import { validate } from '../validators/validate.middleware';
import { verificationLimiter } from '../middleware/verificationLimiter';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify a user's email address
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Cryptographically secure verification token
 *     responses:
 *       200:
 *         description: Email successfully verified
 *       400:
 *         description: Invalid, used, or expired token
 *       404:
 *         description: User not found
 */
router.get(
  '/verify-email', 
  verificationLimiter, 
  verifyEmailValidator, 
  validate, 
  EmailVerificationController.verifyEmail
);

/**
 * @swagger
 * /api/v1/auth/verify-email/resend:
 *   post:
 *     summary: Resend a verification email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email sent successfully (or fake success to prevent enum)
 *       400:
 *         description: Account already verified or suspended
 */
router.post(
  '/verify-email/resend', 
  verificationLimiter, 
  resendVerificationValidator, 
  validate, 
  EmailVerificationController.resendVerification
);

export default router;
