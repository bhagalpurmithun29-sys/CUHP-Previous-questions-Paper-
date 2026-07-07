import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../features/auth/hooks/useSession';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useSession();
  const location = useLocation();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Account status and email verification checks can be added here if they dictate routing
  if (user.accountStatus === 'SUSPENDED' || user.accountStatus === 'BLOCKED') {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};
