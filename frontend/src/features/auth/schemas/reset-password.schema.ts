import { z } from 'zod';
import { RESET_PASSWORD_CONSTANTS } from '../constants/reset-password.constants';

const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const ResetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_REQUIRED,
      })
      .min(12, { message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_TOO_SHORT })
      .regex(passwordRegex.uppercase, { message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_UPPERCASE })
      .regex(passwordRegex.lowercase, { message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_LOWERCASE })
      .regex(passwordRegex.number, { message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_NUMBER })
      .regex(passwordRegex.special, { message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_SPECIAL }),
    confirmPassword: z.string({
      required_error: RESET_PASSWORD_CONSTANTS.MESSAGES.CONFIRM_PASSWORD_REQUIRED,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });
