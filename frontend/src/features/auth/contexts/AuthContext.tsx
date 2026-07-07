import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContextType, User, LoginResponse } from '../types';
import { tokenStorage } from '../../../utils/token.storage';
import { AuthApi } from '../api/auth.api';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load: check if token exists and fetch user
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await AuthApi.getCurrentUser();
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        // If getting user fails, the Axios interceptor might try to refresh.
        // If it still fails, the interceptor will clear the token.
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Listen for global logout events (triggered by Axios interceptor)
  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  const login = useCallback((data: LoginResponse) => {
    tokenStorage.setToken(data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthApi.logout();
    } catch (e) {
      console.error('Logout failed on server', e);
    } finally {
      tokenStorage.clearToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateUser,
    setLoading: setIsLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
