/**
 * CUHP Question Bank - Runtime Configuration Loader
 * Loads, validates, and freezes the configuration to prevent runtime mutations.
 */
import dotenv from 'dotenv';
import { configSchema, Config } from '../validation/configSchema';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const loadConfig = (): Config => {
  const parsed = configSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Configuration Validation Failed:");
    parsed.error.errors.forEach(err => {
      console.error(`- ${err.path.join('.')}: ${err.message}`);
    });
    process.exit(1);
  }

  // Freeze the configuration object to prevent runtime modifications (Governance)
  return Object.freeze(parsed.data);
};

export const config = loadConfig();
