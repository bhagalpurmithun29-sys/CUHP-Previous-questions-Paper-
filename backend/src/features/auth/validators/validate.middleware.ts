import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/auth.errors';

/**
 * Middleware to check for validation errors from express-validator
 * If errors exist, it throws a custom ValidationError which is caught by the global error handler
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Extract error messages into a clean array
    const extractedErrors = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : err.type,
      message: err.msg,
    }));

    throw new ValidationError('Input validation failed', extractedErrors);
  }
  next();
};
