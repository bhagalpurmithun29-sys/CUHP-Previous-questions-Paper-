import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Token has expired. Please login again.';
    err.isOperational = true;
  }
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token. Please login again.';
    err.isOperational = true;
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
      errors: err.errors || null,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
  } else {
    // Production Error
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        data: null,
        errors: err.errors || null,
        timestamp: new Date().toISOString()
      });
    } else {
      // Log unknown error to file
      logger.error('CRITICAL ERROR:', err);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null,
        errors: null,
        timestamp: new Date().toISOString()
      });
    }
  }
};
