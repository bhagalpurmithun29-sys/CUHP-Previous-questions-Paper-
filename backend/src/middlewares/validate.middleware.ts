import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

export const validate = (schema: ZodSchema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const issues = error.issues || (error as any).errors || [];
        const message = issues.map((e: any) => `${(e.path || []).join('.')}: ${e.message}`).join(', ');
        return next(new AppError(400, message));
      }
      return next(new AppError(400, 'Validation Error'));
    }
  };
};
