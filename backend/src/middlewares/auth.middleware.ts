import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // For development/mocking if JWT_SECRET isn't present, we just mock user
    if (!token && process.env.NODE_ENV !== 'production') {
       // Mock for testing
       (req as any).user = { id: 'mock-admin-id', role: 'ADMIN' } as any;
       return next();
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // Verify token (Assume JWT_SECRET exists in real environment)
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');

    const currentUser = await User.findById(decoded.id).populate({
      path: 'dynamicRoles',
      populate: { path: 'permissions' }
    });

    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    (req as any).user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const currentUser = await User.findById(decoded.id);
    
    if (currentUser) {
      (req as any).user = currentUser;
    }
    
    next();
  } catch (error) {
    next();
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check both legacy enum role and new dynamic roles
    const userRole = (req as any).user?.role;
    // @ts-ignore
    const dynamicRoles = (req as any).user?.dynamicRoles || [];
    
    let hasAccess = false;
    
    if (roles.includes(userRole as string)) {
      hasAccess = true;
    }
    
    if (!hasAccess) {
       for (const dr of dynamicRoles) {
         if (roles.includes(dr.name.toUpperCase())) {
           hasAccess = true;
           break;
         }
       }
    }
    
    // Super admin override
    if (userRole === 'ADMIN') {
      hasAccess = true;
    }

    if (!hasAccess) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

export const requirePermission = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Check Super Admin Override
    if ((req as any).user?.role === 'ADMIN') {
      return next();
    }

    // @ts-ignore
    const user = (req as any).user;
    if (!user) return next(new AppError('Not logged in', 401));

    // 2. Check granular string permissions (legacy field)
    if (user.permissions && user.permissions.includes(permissionName)) {
      return next();
    }

    // 3. Check Dynamic Roles & Permissions Matrix
    let hasAccess = false;
    const dynamicRoles = user.dynamicRoles || [];
    
    for (const role of dynamicRoles) {
      for (const perm of role.permissions) {
        if (perm.name.toUpperCase() === permissionName.toUpperCase()) {
          hasAccess = true;
          break;
        }
      }
      if (hasAccess) break;
    }

    if (!hasAccess) {
      return next(new AppError(`Required permission missing: ${permissionName}`, 403));
    }

    next();
  };
};
