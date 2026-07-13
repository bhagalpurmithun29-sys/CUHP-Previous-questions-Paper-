/**
 * CUHP Question Bank - Configuration Schema & Validation
 * Defines the strict schema for runtime configuration validation.
 */
import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('5000'),
  
  // Database
  MONGO_URI: z.string().url(),
  
  // JWT
  JWT_SECRET: z.string().min(32, "JWT Secret must be at least 32 characters long for security"),
  JWT_EXPIRES_IN: z.string().default('1d'),
  
  // OAuth (Optional depending on auth flow)
  OAUTH_GOOGLE_CLIENT_ID: z.string().optional(),
  OAUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),
  
  // SMTP
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().regex(/^\d+$/).transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  
  // Cloud Storage
  STORAGE_BUCKET_NAME: z.string(),
  STORAGE_ACCESS_KEY: z.string(),
  STORAGE_SECRET_KEY: z.string(),
  
  // AI Integration
  AI_PROVIDER_API_KEY: z.string().min(10, "Valid AI provider key required"),
  
  // Push Notifications
  PUSH_NOTIFICATION_VAPID_PUBLIC: z.string().optional(),
  PUSH_NOTIFICATION_VAPID_PRIVATE: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;
