import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '../features/auth/hooks/useRole';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';
import { UserRole } from '../features/auth/types';

interface RoleRouteProps {
  allowedRoles: (UserRole | string)[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { hasAnyRole, loading, authenticated } = useRole();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!authenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
