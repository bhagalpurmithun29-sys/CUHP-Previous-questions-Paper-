import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAIInsights = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getInsights = useQuery({
    queryKey: ['aiInsights', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/ai-insights/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const processInsights = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/ai-insights/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['aiInsights', id] });
    }
  });

  return {
    getInsights,
    processInsights
  };
};
