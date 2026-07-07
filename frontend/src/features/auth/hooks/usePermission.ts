import { useAuth } from '../context/AuthContext';
import type { UserPermission } from '../types/login.types';

export const usePermission = () => {
  const { auth } = useAuth();
  const permissions = auth?.user?.permissions || [];

  const hasPermission = (permission: UserPermission) => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: UserPermission[]) => {
    return requiredPermissions.some((p) => permissions.includes(p));
  };

  const hasAllPermissions = (requiredPermissions: UserPermission[]) => {
    return requiredPermissions.every((p) => permissions.includes(p));
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
