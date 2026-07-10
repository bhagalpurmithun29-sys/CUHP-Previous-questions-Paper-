import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useTopicMapping = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getStatus = useQuery({
    queryKey: ['topicStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/topic-mapping/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const processMapping = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/topic-mapping/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['topicStatus', id] });
    }
  });

  const reprocessMapping = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/topic-mapping/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['topicStatus', id] });
    }
  });
  
  const reviewMapping = useMutation({
    mutationFn: async ({ id, questionId, action, overrides }: { id: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', overrides?: any }) => {
      const res = await axios.put(`${API_URL}/topic-mapping/review/${id}/${questionId}`, { action, manualOverrides: overrides }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['topicStatus', id] });
    }
  });

  return {
    getStatus,
    processMapping,
    reprocessMapping,
    reviewMapping
  };
};
