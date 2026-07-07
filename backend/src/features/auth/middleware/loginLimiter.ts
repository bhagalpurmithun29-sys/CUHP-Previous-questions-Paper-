import rateLimit from 'express-rate-limit';
import { AuthErrors } from '../constants/auth.constants';

// Limit each IP to 5 login requests per 15 minutes
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    errors: [AuthErrors.FORBIDDEN]
  },
  standardHeaders: true,
  legacyHeaders: false,
});
