import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../features/auth/hooks/useSession';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

export const GuestRoute: React.FC = () => {
  const { authenticated, loading } = useSession();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
