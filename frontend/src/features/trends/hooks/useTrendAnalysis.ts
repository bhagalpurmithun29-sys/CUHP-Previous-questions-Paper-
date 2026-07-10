import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useTrendAnalysis = (filters: any) => {
  const getOverview = useQuery({
    queryKey: ['trendOverview', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/trend-analysis/overview`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getTopicTrends = useQuery({
    queryKey: ['trendTopic', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/trend-analysis/topic`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getBloomTrends = useQuery({
    queryKey: ['trendBloom', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/trend-analysis/bloom`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getDifficultyTrends = useQuery({
    queryKey: ['trendDifficulty', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/trend-analysis/difficulty`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getOverview,
    getTopicTrends,
    getBloomTrends,
    getDifficultyTrends
  };
};
