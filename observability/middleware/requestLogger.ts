/**
 * Request Logging Middleware
 * Attaches Correlation IDs and Request IDs for trace propagation.
 */
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../logging/logger';
import { metrics } from '../metrics/collector';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  const correlationId = req.headers['x-correlation-id'] || requestId;

  req.headers['x-request-id'] = requestId;
  req.headers['x-correlation-id'] = correlationId;

  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const timeMs = (diff[0] * 1e9 + diff[1]) / 1e6;
    
    logger.info('HTTP Request', {
      requestId,
      correlationId,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      durationMs: timeMs
    });

    metrics.recordHttpRequest(req.method, req.route?.path || req.url, res.statusCode, timeMs);
  });

  next();
};
