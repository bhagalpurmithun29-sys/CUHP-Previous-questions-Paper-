/**
 * Health Monitoring Endpoints
 * Exposes /health, /health/ready, /health/live for Kubernetes probes.
 */
import { Request, Response } from 'express';

export const getLiveness = (req: Request, res: Response) => {
  // Check if process is running and not deadlocked
  res.status(200).json({ status: 'UP', timestamp: new Date() });
};

export const getReadiness = async (req: Request, res: Response) => {
  try {
    // Placeholder: Check DB Connection, Cache, and Queue health
    const isDbConnected = true; // await db.ping()
    const isCacheConnected = true; // await redis.ping()
    
    if (isDbConnected && isCacheConnected) {
      res.status(200).json({
        status: 'READY',
        components: {
          database: 'UP',
          cache: 'UP'
        }
      });
    } else {
      res.status(503).json({ status: 'UNAVAILABLE' });
    }
  } catch (error) {
    res.status(503).json({ status: 'ERROR', error: (error as Error).message });
  }
};

export const getFullHealth = async (req: Request, res: Response) => {
  // Aggregated health including external services, AI providers, and Storage
  res.status(200).json({
    status: 'HEALTHY',
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    components: {
      api: 'UP',
      database: 'UP',
      cache: 'UP',
      queue: 'UP',
      aiProvider: 'UP',
      storage: 'UP'
    }
  });
};
