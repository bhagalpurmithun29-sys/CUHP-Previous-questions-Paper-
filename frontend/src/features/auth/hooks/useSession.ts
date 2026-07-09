import { useAuth } from './useAuth';
import { AuthApi } from '../api/auth.api';
import toast from 'react-hot-toast';

export const useSession = () => {
  const { user, isAuthenticated, isLoading, login, logout, updateUser } = useAuth();

  const refresh = async () => {
    try {
      const response = await AuthApi.refreshToken();
      // Normally refresh API returns a new access token, which we save.
      // The updated token is then used for subsequent requests.
      if (response && response.data && response.data.accessToken) {
        // We'll call getCurrentUser again to sync state, or if backend returns user we use it.
        const userRes = await AuthApi.getCurrentUser();
        login({
          message: 'Refreshed',
          accessToken: response.data.accessToken,
          user: userRes.data
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
        toast.error('Session expired. Please log in again.');
      }
    }
  };

  // Mocking roles and permissions parsing from User object for RBAC architecture
  // In a real enterprise system, permissions might come from an array inside `user`
  const roles = user?.role ? [user.role] : [];
  
  // Here we derive permissions based on roles or user data. 
  // Normally this comes from backend.
  const permissions = user ? ['read:own_profile', 'update:own_profile'] : [];
  if (roles.includes('ADMIN' as any)) {
    permissions.push('manage:users', 'manage:system', 'delete:any');
  } else if (roles.includes('MODERATOR' as any)) {
    permissions.push('manage:content');
  }

  return {
    loading: isLoading,
    authenticated: isAuthenticated,
    user,
    roles,
    permissions,
    logout,
    refresh,
  };
};
