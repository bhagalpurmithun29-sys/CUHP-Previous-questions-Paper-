import { z } from 'zod';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';

export const ResendVerificationSchema = z.object({
  email: z
    .string({
      required_error: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EMAIL_REQUIRED,
      invalid_type_error: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EMAIL_INVALID,
    })
    .trim()
    .min(1, { message: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EMAIL_REQUIRED })
    .email({ message: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EMAIL_INVALID })
    .toLowerCase(),
});
