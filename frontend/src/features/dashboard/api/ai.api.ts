import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useAiUsageStats = () => {
  return useQuery({
    queryKey: ['aiUsageStats'],
    queryFn: async () => {
      const { data } = await apiClient.get('/ai/usage');
      return data.data;
    },
    staleTime: 60 * 1000,
  });
};

export const useAiProviders = () => {
  return useQuery({
    queryKey: ['aiProviders'],
    queryFn: async () => {
      const { data } = await apiClient.get('/ai/providers');
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
