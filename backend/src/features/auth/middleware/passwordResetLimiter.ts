import rateLimit from 'express-rate-limit';
import { AuthErrors } from '../constants/auth.constants';

// Limit each IP to 5 forgot password requests per hour
export const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    message: 'Too many password reset requests from this IP, please try again after an hour',
    errors: [AuthErrors.FORBIDDEN]
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limit each IP to 10 reset password attempts per hour
export const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: 'Too many reset attempts from this IP, please try again after an hour',
    errors: [AuthErrors.FORBIDDEN]
  },
  standardHeaders: true,
  legacyHeaders: false,
});
