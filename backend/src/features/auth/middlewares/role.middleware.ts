import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../../utils/ApiError';
import { UserRole } from '../../../enums/auth.enum';
import { hasRequiredRoleLevel } from '../constants/roles';

/**
 * Requires the user to have a specific role or higher (Role Hierarchy).
 * Must be used AFTER authenticateUser.
 */
export const requireRole = (minimumRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required to verify role.');
    }

    if (!hasRequiredRoleLevel(req.user.role, minimumRole)) {
      throw new ForbiddenError(`Access denied. Requires ${minimumRole} role or higher.`);
    }

    next();
  };
};

/**
 * Requires the user to have EXACTLY one of the specified roles.
 * Disregards hierarchy.
 */
export const requireExactRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required to verify role.');
    }

    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Access denied. You do not have the required role for this action.');
    }

    next();
  };
};
