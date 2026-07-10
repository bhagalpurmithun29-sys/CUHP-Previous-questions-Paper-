import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BloomLevel } from '../../../../../backend/src/models/bloom.model';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useBloomClassification = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getStatus = useQuery({
    queryKey: ['bloomStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/bloom/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const processBloom = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/bloom/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['bloomStatus', id] });
    }
  });

  const reprocessBloom = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/bloom/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['bloomStatus', id] });
    }
  });
  
  const reviewClassification = useMutation({
    mutationFn: async ({ id, questionId, action, overrideLevel }: { id: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', overrideLevel?: BloomLevel }) => {
      const res = await axios.put(`${API_URL}/bloom/review/${id}/${questionId}`, { action, manualOverrideLevel: overrideLevel }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bloomStatus', id] });
    }
  });

  return {
    getStatus,
    processBloom,
    reprocessBloom,
    reviewClassification
  };
};
