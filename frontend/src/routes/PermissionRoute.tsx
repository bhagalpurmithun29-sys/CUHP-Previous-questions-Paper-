import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usePermission } from '../features/auth/hooks/usePermission';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

interface PermissionRouteProps {
  permissions: string | string[];
  requireAll?: boolean;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({ 
  permissions, 
  requireAll = false 
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, loading, authenticated } = usePermission();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!authenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  const perms = Array.isArray(permissions) ? permissions : [permissions];
  
  let authorized = false;
  if (perms.length === 1) {
    authorized = hasPermission(perms[0]);
  } else if (requireAll) {
    authorized = hasAllPermissions(perms);
  } else {
    authorized = hasAnyPermission(perms);
  }

  if (!authorized) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
