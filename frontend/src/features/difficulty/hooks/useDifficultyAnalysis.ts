import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useDifficultyAnalysis = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getStatus = useQuery({
    queryKey: ['difficultyStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/difficulty/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const processAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/difficulty/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['difficultyStatus', id] });
    }
  });

  const reprocessAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/difficulty/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['difficultyStatus', id] });
    }
  });
  
  const reviewAnalysis = useMutation({
    mutationFn: async ({ id, questionId, action, overrides }: { id: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', overrides?: any }) => {
      const res = await axios.put(`${API_URL}/difficulty/review/${id}/${questionId}`, { action, manualOverrides: overrides }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['difficultyStatus', id] });
    }
  });

  return {
    getStatus,
    processAnalysis,
    reprocessAnalysis,
    reviewAnalysis
  };
};
