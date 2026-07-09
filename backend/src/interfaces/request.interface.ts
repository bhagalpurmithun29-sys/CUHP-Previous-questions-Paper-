import { Request } from 'express';
import { IUser } from './auth.interface';
import { Permission } from '../features/auth/constants/permissions';

// Extend the Express Request interface globally
declare global {
  namespace Express {
    interface Request {
      user?: IUser | any;
      userPermissions?: Permission[];
      sessionId?: string;
      deviceInfo?: {
        ip: string;
        userAgent: string;
      };
    }
  }
}
