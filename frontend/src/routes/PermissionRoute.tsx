import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePermission } from '../features/auth/hooks/usePermission';
import { useSession } from '../features/auth/hooks/useSession';
import type { UserPermission } from '../features/auth/types/login.types';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

interface PermissionRouteProps {
  requiredPermissions: UserPermission[];
  requireAll?: boolean;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({
  requiredPermissions,
  requireAll = false,
}) => {
  const { isAuthenticated, isLoading } = useSession();
  const { hasAllPermissions, hasAnyPermission } = usePermission();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = requireAll
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  if (!hasAccess) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
