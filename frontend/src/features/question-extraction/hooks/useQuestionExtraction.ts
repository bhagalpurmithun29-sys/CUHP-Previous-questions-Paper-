import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useQuestionExtraction = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getQueue = useQuery({
    queryKey: ['extractionQueue'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/question-extraction/queue`, { withCredentials: true });
      return res.data.data;
    },
    refetchInterval: 5000
  });

  const getStatus = useQuery({
    queryKey: ['extractionStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/question-extraction/status/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const getQuestions = useQuery({
    queryKey: ['extractedQuestions', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/question-extraction/questions/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId && getStatus.data?.status === 'COMPLETED'
  });

  const processExtraction = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/question-extraction/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['extractionQueue'] });
      queryClient.invalidateQueries({ queryKey: ['extractionStatus', id] });
    }
  });

  const reprocessExtraction = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/question-extraction/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['extractionQueue'] });
      queryClient.invalidateQueries({ queryKey: ['extractionStatus', id] });
      queryClient.invalidateQueries({ queryKey: ['extractedQuestions', id] });
    }
  });
  
  const reviewExtraction = useMutation({
    mutationFn: async ({ id, action }: { id: string, action: 'APPROVE' | 'REJECT' }) => {
      const res = await axios.put(`${API_URL}/question-extraction/review/${id}`, { action }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['extractionStatus', id] });
      queryClient.invalidateQueries({ queryKey: ['extractedQuestions', id] });
    }
  });

  return {
    getQueue,
    getStatus,
    getQuestions,
    processExtraction,
    reprocessExtraction,
    reviewExtraction
  };
};
