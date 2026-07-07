import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to attach basic device and network context to the request early in the lifecycle.
 * Useful for audit logging and rate limiting down the line.
 */
export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.deviceInfo = {
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
  };
  
  next();
};
