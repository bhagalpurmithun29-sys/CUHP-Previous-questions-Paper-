import { z } from 'zod';
import { RESET_PASSWORD_CONSTANTS } from '../constants/resetPassword.constants';

export const ResetPasswordSchema = z.object({
  password: z
    .string({ required_error: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_REQUIRED })
    .min(RESET_PASSWORD_CONSTANTS.VALIDATION.MIN_LENGTH, { message: RESET_PASSWORD_CONSTANTS.VALIDATION.REGEX_MESSAGE })
    .max(RESET_PASSWORD_CONSTANTS.VALIDATION.MAX_LENGTH, { message: `Password must be at most ${RESET_PASSWORD_CONSTANTS.VALIDATION.MAX_LENGTH} characters` })
    .regex(RESET_PASSWORD_CONSTANTS.VALIDATION.REGEX, { message: RESET_PASSWORD_CONSTANTS.VALIDATION.REGEX_MESSAGE }),
  confirmPassword: z
    .string({ required_error: RESET_PASSWORD_CONSTANTS.MESSAGES.CONFIRM_PASSWORD_REQUIRED }),
}).refine((data) => data.password === data.confirmPassword, {
  message: RESET_PASSWORD_CONSTANTS.MESSAGES.PASSWORD_MISMATCH,
  path: ['confirmPassword'],
});

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
