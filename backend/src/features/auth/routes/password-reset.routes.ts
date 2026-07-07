import { Router } from 'express';
import { PasswordResetController } from '../controllers/password-reset.controller';
import { forgotPasswordValidator, resetPasswordValidator } from '../validators/password-reset.validator';
import { validate } from '../validators/validate.middleware';
import { forgotPasswordLimiter, resetPasswordLimiter } from '../middleware/passwordResetLimiter';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request a password reset email
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
 *         description: Generic success message (prevents email enumeration)
 *       429:
 *         description: Too many requests
 */
router.post(
  '/forgot-password',
  forgotPasswordLimiter,
  forgotPasswordValidator,
  validate,
  PasswordResetController.forgotPassword
);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password using secure token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password successfully reset and sessions invalidated
 *       400:
 *         description: Invalid/expired token or password mismatch
 */
router.post(
  '/reset-password',
  resetPasswordLimiter,
  resetPasswordValidator,
  validate,
  PasswordResetController.resetPassword
);

export default router;
