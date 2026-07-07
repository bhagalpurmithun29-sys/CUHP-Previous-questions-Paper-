import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../api/auth.api';
import { FullScreenLoader } from './FullScreenLoader';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { auth, setAuth, logout } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!auth?.tokens?.accessToken) {
          setIsInitializing(false);
          return;
        }

        const response = await getCurrentUser();
        if (response.success && response.data) {
          setAuth(response.data);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  if (isInitializing) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
};
