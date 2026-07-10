import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useMarksAnalysis = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getStatus = useQuery({
    queryKey: ['marksStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/marks-analysis/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const processAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/marks-analysis/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['marksStatus', id] });
    }
  });

  const reprocessAnalysis = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/marks-analysis/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['marksStatus', id] });
    }
  });
  
  const reviewAnalysis = useMutation({
    mutationFn: async ({ id, action }: { id: string, action: 'APPROVE' | 'REJECT' }) => {
      const res = await axios.put(`${API_URL}/marks-analysis/review/${id}`, { action }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['marksStatus', id] });
    }
  });

  return {
    getStatus,
    processAnalysis,
    reprocessAnalysis,
    reviewAnalysis
  };
};
