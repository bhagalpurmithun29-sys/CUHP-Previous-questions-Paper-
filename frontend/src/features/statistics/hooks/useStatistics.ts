import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const usePublicStatistics = () => {
  return useQuery({
    queryKey: ['publicStatistics'],
    queryFn: async () => {
      const { data } = await apiClient.get('/public/statistics');
      return data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePublicCoverage = () => {
  return useQuery({
    queryKey: ['publicCoverage'],
    queryFn: async () => {
      const { data } = await apiClient.get('/public/coverage');
      return data.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const usePublicTrending = () => {
  return useQuery({
    queryKey: ['publicTrending'],
    queryFn: async () => {
      const { data } = await apiClient.get('/public/trending');
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const usePublicActivity = () => {
  return useQuery({
    queryKey: ['publicActivity'],
    queryFn: async () => {
      const { data } = await apiClient.get('/public/activity');
      return data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
