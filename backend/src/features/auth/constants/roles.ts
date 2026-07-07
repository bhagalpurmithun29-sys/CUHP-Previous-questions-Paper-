import { UserRole } from '../../../enums/auth.enum';

// Role Hierarchy for authorization levels (higher number = more access)
export const RoleHierarchy: Record<UserRole, number> = {
  [UserRole.STUDENT]: 10,
  [UserRole.MODERATOR]: 50,
  [UserRole.ADMIN]: 100,
};

/**
 * Checks if a user's role is greater than or equal to the required role
 */
export const hasRequiredRoleLevel = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const userLevel = RoleHierarchy[userRole] || 0;
  const requiredLevel = RoleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};
