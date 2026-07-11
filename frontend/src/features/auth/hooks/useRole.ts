import { useSession } from './useSession';
import { UserRole } from '../types';

export const useRole = () => {
  const { roles, loading, authenticated } = useSession();

  const hasRole = (role: UserRole | string) => {
    return roles.includes(role as UserRole);
  };

  const hasAnyRole = (requiredRoles: (UserRole | string)[]) => {
    return requiredRoles.some((r) => roles.includes(r as UserRole));
  };

  const isStudent = hasRole(UserRole.STUDENT);
  const isModerator = hasRole(UserRole.MODERATOR);
  const isAdmin = hasRole(UserRole.ADMIN);


  const isAtLeastModerator = isModerator || isAdmin;

  return {
    roles,
    hasRole,
    hasAnyRole,
    isStudent,
    isModerator,
    isAdmin,
    isAtLeastModerator,
    loading,
    authenticated
  };
};
