import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../../utils/ApiError';
import { UserRole } from '../../../enums/auth.enum';

/**
 * Validates if the authenticated user owns the resource they are trying to modify.
 * Allows overrides for Moderators and Admins based on configuration.
 * 
 * @param resourceUserIdPath The path in req object where the target resource's owner ID is located (e.g., 'params.id', 'body.userId', 'resource.ownerId')
 * @param allowModeratorOverride If true, Moderators can bypass this check
 * @param allowAdminOverride If true, Admins can bypass this check (usually always true)
 */
export const requireOwnership = (
  getResourceOwnerId: (req: Request) => string | undefined,
  allowModeratorOverride: boolean = false,
  allowAdminOverride: boolean = true
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError('Authentication required to verify ownership.');
    }

    // 1. Admin Override
    if (allowAdminOverride && req.user.role === UserRole.ADMIN) {
      return next();
    }

    // 2. Moderator Override
    if (allowModeratorOverride && req.user.role === UserRole.MODERATOR) {
      return next();
    }

    // 3. Exact Ownership Match
    const resourceOwnerId = getResourceOwnerId(req);
    const requestingUserId = req.user._id.toString();

    if (!resourceOwnerId || resourceOwnerId !== requestingUserId) {
      throw new ForbiddenError('Access denied. You do not have ownership of this resource.');
    }

    next();
  };
};
