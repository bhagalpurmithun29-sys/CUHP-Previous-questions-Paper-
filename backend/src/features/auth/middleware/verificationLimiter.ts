import rateLimit from 'express-rate-limit';
import { AuthErrors } from '../constants/auth.constants';

// Limit each IP to 3 verification/resend requests per hour
export const verificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Too many verification requests from this IP, please try again after an hour',
    errors: [AuthErrors.FORBIDDEN]
  },
  standardHeaders: true,
  legacyHeaders: false,
});
