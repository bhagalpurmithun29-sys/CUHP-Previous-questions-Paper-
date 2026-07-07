import { z } from 'zod';

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email address is required.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_TOO_SHORT: 'Password must be at least 12 characters.',
  PASSWORD_TOO_LONG: 'Password cannot exceed 128 characters.',
} as const;

export const loginSchema = z.object({
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.EMAIL_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.EMAIL_REQUIRED,
    })
    .trim()
    .min(1, { message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
    .max(255, { message: 'Email cannot exceed 255 characters.' })
    .email({ message: VALIDATION_MESSAGES.EMAIL_INVALID })
    .toLowerCase(),

  password: z
    .string({
      required_error: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
    })
    .trim()
    .min(1, { message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
    .min(12, { message: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT })
    .max(128, { message: VALIDATION_MESSAGES.PASSWORD_TOO_LONG }),

  rememberMe: z.boolean().optional().default(false),
});

export type LoginSchema = typeof loginSchema;
export type LoginFormData = z.infer<typeof loginSchema>;
