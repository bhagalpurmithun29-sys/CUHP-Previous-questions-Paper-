import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const usePatternAnalysis = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getStatus = useQuery({
    queryKey: ['patternStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/pattern-analysis/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const getSimilar = useQuery({
      queryKey: ['patternSimilar', paperId],
      queryFn: async () => {
          if (!paperId) return null;
          const res = await axios.get(`${API_URL}/pattern-analysis/similar/${paperId}`, { withCredentials: true });
          return res.data.data;
      },
      enabled: !!paperId
  });

  const processAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/pattern-analysis/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['patternStatus', id] });
    }
  });

  const reprocessAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/pattern-analysis/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['patternStatus', id] });
    }
  });
  
  const reviewAnalysis = useMutation({
    mutationFn: async ({ id, action }: { id: string, action: 'APPROVE' | 'REJECT' }) => {
      const res = await axios.put(`${API_URL}/pattern-analysis/review/${id}`, { action }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['patternStatus', id] });
    }
  });

  return {
    getStatus,
    getSimilar,
    processAnalysis,
    reprocessAnalysis,
    reviewAnalysis
  };
};
