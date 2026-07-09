import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';
import { JwtUtil } from '../utils/jwt.util';
import { UnauthorizedError, ForbiddenError } from '../../../utils/ApiError';
import { AuthErrors } from '../constants/auth.constants';
import { UserRole } from '../../../enums/auth.enum';
import { IAuthUser } from '../types/jwt.types';


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = JwtUtil.extractTokenFromHeader(req);
    
    if (!token) {
      throw new UnauthorizedError(AuthErrors.MISSING_TOKEN);
    }

    const decoded = JwtService.verifyAccessToken(token);

    // Attach user payload to request
    req.user = {
      id: decoded.userId,
      role: decoded.role,
      tokenVersion: decoded.tokenVersion,
      sessionId: decoded.sessionId
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const requireRoles = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError(AuthErrors.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError(AuthErrors.FORBIDDEN));
    }

    next();
  };
};
