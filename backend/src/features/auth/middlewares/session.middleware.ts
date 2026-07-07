import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../../../utils/ApiError';
import { AccountStatus } from '../../../enums/auth.enum';

/**
 * Validates the user's account status.
 * Must be placed AFTER authenticateUser middleware.
 */
export const validateAccountStatus = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    throw new ForbiddenError('User context not found. Authentication required.');
  }

  switch (user.accountStatus) {
    case AccountStatus.ACTIVE:
      // All good
      break;
    case AccountStatus.PENDING_VERIFICATION:
      throw new ForbiddenError('Your account is pending email verification.');
    case AccountStatus.SUSPENDED:
      throw new ForbiddenError('Your account is temporarily suspended. Please contact support.');
    case AccountStatus.BLOCKED:
      throw new ForbiddenError('Your account has been blocked due to policy violations.');
    case AccountStatus.DELETED:
      throw new ForbiddenError('Your account has been deleted.');
    case AccountStatus.INACTIVE:
      throw new ForbiddenError('Your account is inactive. Please contact support to reactivate.');
    default:
      throw new ForbiddenError('Invalid account status.');
  }

  next();
};
