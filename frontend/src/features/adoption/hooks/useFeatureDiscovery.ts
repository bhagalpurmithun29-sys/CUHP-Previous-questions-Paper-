import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/adoption';

export const useFeatureDiscovery = () => {
  return useQuery({
    queryKey: ['whats-new'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/whats-new`);
      return data.data;
    }
  });
};
