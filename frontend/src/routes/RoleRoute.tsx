import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '../features/auth/hooks/useRole';
import { useSession } from '../features/auth/hooks/useSession';
import type { UserRole } from '../features/auth/types/login.types';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading } = useSession();
  const { hasAnyRole } = useRole();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
