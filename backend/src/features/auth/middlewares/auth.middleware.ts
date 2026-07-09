import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../../../utils/ApiError';
import { TokenService } from '../services/token.service';
import { User } from '../../../models/user.model';
import catchAsync from '../../../utils/catchAsync';
import { RolePermissions } from '../constants/permissions';

/**
 * Core Authentication Middleware
 * Validates JWT, verifies token version, and loads the user into req.user
 */
export const authenticateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Extract token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new UnauthorizedError('You are not logged in. Please provide a valid access token.');
  }

  // 2. Verify Token mathematically
  const decoded = TokenService.verifyAccessToken(token);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.userId).select('+refreshTokenVersion +accountStatus +isDeleted');
  
  if (!currentUser || currentUser.isDeleted) {
    throw new UnauthorizedError('The user belonging to this token no longer exists.');
  }

  // 4. Validate Token Version (Invalidates old tokens if password was reset)
  if (currentUser.refreshTokenVersion !== decoded.tokenVersion) {
    throw new UnauthorizedError('Your session has expired or password was changed. Please log in again.');
  }

  // 5. Attach User and Permissions to Request
  (req as any).user = currentUser;
  req.userPermissions = (RolePermissions as any)[currentUser.role] || [];
  req.sessionId = decoded.sessionId;

  next();
});
