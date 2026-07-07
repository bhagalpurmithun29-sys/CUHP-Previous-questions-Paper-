import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../../utils/ApiError';
import { Permission } from '../constants/permissions';

/**
 * Ensures the user has all of the specified permissions
 */
export const requireAllPermissions = (permissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.userPermissions) {
      throw new ForbiddenError('Authentication required to verify permissions.');
    }

    const hasAll = permissions.every(p => req.userPermissions!.includes(p));
    
    if (!hasAll) {
      throw new ForbiddenError('Access denied. You do not have the required permissions for this action.');
    }

    next();
  };
};

/**
 * Ensures the user has AT LEAST ONE of the specified permissions
 */
export const requireAnyPermission = (permissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.userPermissions) {
      throw new ForbiddenError('Authentication required to verify permissions.');
    }

    const hasAny = permissions.some(p => req.userPermissions!.includes(p));
    
    if (!hasAny) {
      throw new ForbiddenError('Access denied. You lack the minimum permissions for this action.');
    }

    next();
  };
};

/**
 * Requires a single specific permission
 */
export const requirePermission = (permission: Permission) => {
  return requireAllPermissions([permission]);
};
