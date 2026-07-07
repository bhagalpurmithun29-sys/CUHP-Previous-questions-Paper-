import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { UserRole } from '../../features/auth/types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Return a generic skeleton or loading spinner here
    return <div className="flex h-screen items-center justify-center">Loading session...</div>;
  }

  if (!isAuthenticated || !user) {
    // Redirect to login but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the right role
    return <Navigate to="/unauthorized" replace />;
  }

  // Check email verification if required by your app policy
  // if (!user.emailVerified) {
  //   return <Navigate to="/verify-email-pending" replace />;
  // }

  return <Outlet />;
};

export const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) {
    // Redirect authenticated users away from guest pages (like login/register)
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
