import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useLibrary = () => {
  const getOverview = useQuery({
    queryKey: ['library-overview'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/library-new`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getRecommendations = useQuery({
    queryKey: ['library-recommendations'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/library-new/recommendations`, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    overview: getOverview.data,
    recommendations: getRecommendations.data,
    isLoading: getOverview.isLoading || getRecommendations.isLoading,
  };
};
