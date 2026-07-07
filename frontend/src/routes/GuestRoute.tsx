import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../features/auth/hooks/useSession';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

export const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
