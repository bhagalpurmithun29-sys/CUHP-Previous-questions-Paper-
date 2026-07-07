import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/auth.api';

export const useSession = () => {
  const { auth, setAuth, logout } = useAuth();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response.data;
    },
    enabled: !!auth?.user,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user: data || auth?.user,
    isAuthenticated: !!auth?.user,
    isLoading,
    isError,
    error,
    refreshSession: refetch,
    logout,
  };
};
