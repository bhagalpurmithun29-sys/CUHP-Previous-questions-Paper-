/**
 * Centralized Logging Configuration
 * Supports Structured JSON Logs, Log Levels, and Sensitive Data Redaction.
 */
import winston from 'winston';

// Redact sensitive fields (Passwords, tokens, PII)
const redactSensitive = winston.format((info) => {
  const sensitiveKeys = ['password', 'token', 'jwt', 'secret', 'authorization'];
  if (info.message && typeof info.message === 'object') {
    for (const key of Object.keys(info.message)) {
      if (sensitiveKeys.includes(key.toLowerCase())) {
        info.message[key] = '[REDACTED]';
      }
    }
  }
  return info;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    redactSensitive(),
    winston.format.json()
  ),
  defaultMeta: { service: 'cuhp-api' },
  transports: [
    new winston.transports.Console()
  ]
});
