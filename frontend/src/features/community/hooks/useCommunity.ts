import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useLeaderboard = (type: string = 'overall') => {
  return useQuery({
    queryKey: ['leaderboard', type],
    queryFn: async () => {
      const { data } = await apiClient.get('/community/leaderboard', { params: { type } });
      return data.data;
    },
    staleTime: 5 * 60 * 1000, // 5 mins
  });
};

export const useHallOfFame = () => {
  return useQuery({
    queryKey: ['hallOfFame'],
    queryFn: async () => {
      const { data } = await apiClient.get('/community/hall-of-fame');
      return data.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePublicProfile = (userId: string) => {
  return useQuery({
    queryKey: ['publicProfile', userId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/community/profile/${userId}`);
      return data.data;
    },
    enabled: !!userId,
  });
};
