import { z } from 'zod';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgotPassword.constants';

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_REQUIRED,
      invalid_type_error: FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_INVALID,
    })
    .trim()
    .min(1, { message: FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_REQUIRED })
    .email({ message: FORGOT_PASSWORD_CONSTANTS.MESSAGES.EMAIL_INVALID })
    .toLowerCase(),
});

export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
