import { useQuery } from '@tanstack/react-query';
import { DashboardApi } from '../api/dashboard.api';

export const useProfile = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: DashboardApi.getProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  return {
    profile: data,
    loading: isLoading,
    error,
    isError,
    refetch,
  };
};
