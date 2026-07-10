import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAIQuality = () => {
  const queryClient = useQueryClient();

  const getQueue = useQuery({
    queryKey: ['aiQualityQueue'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-quality/queue`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getMetrics = useQuery({
    queryKey: ['aiQualityMetrics'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-quality/metrics`, { withCredentials: true });
      return res.data.data;
    }
  });

  const submitReview = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/ai-quality/review`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiQualityQueue'] });
      queryClient.invalidateQueries({ queryKey: ['aiQualityMetrics'] });
    }
  });

  return {
    getQueue,
    getMetrics,
    submitReview
  };
};
