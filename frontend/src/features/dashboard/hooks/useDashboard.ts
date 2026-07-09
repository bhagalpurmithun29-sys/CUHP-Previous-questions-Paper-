import { useQuery } from '@tanstack/react-query';
import { DashboardApi } from '../api/dashboard.api';

export const useDashboard = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: DashboardApi.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    data,
    loading: isLoading,
    error,
    isError,
    refetch,
  };
};
