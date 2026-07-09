import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../features/auth/hooks/useSession';
import { FullScreenLoader } from '../features/auth/components/FullScreenLoader';

export const ProtectedRoute: React.FC = () => {
  const { authenticated, loading, user } = useSession();
  const location = useLocation();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Example architectural check: If the user hasn't verified their email, we might restrict them
  // if (!user?.emailVerified) {
  //   return <Navigate to="/verify-email/pending" replace />;
  // }

  return <Outlet />;
};
