import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { registerValidator } from '../validators/register.validator';
import { validate } from '../validators/validate.middleware';
import { loginValidator } from '../validators/login.validator';
import { loginLimiter } from '../middleware/loginLimiter';

const router = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new student account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *               department:
 *                 type: string
 *                 format: objectId
 *               course:
 *                 type: string
 *                 format: objectId
 *               semester:
 *                 type: number
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Validation Error or Duplicate Email
 */
router.post('/register', registerValidator, validate, AuthController.register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and get tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in, returns user and access token
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Account suspended or pending verification
 */
router.post('/login', loginLimiter, loginValidator, validate, AuthController.login);

export default router;
