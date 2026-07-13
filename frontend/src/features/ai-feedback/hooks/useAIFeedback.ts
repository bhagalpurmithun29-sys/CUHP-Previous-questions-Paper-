import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/ai-feedback';

export const useAIFeedback = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: queue, isLoading: isLoadingQueue } = useQuery({
    queryKey: ['feedback-queue'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/queue`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: qualityMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['feedback-quality'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/quality`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: reports, isLoading: isLoadingReports } = useQuery({
    queryKey: ['feedback-reports'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/reports`, getAuthHeaders());
      return res.data.data;
    }
  });

  const submitEvaluation = useMutation({
    mutationFn: async ({ feedbackId, evaluation }: { feedbackId: string; evaluation: any }) => {
      const res = await axios.post(`\${API_BASE}/evaluate`, { feedbackId, evaluation }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedback-queue'] });
      queryClient.invalidateQueries({ queryKey: ['feedback-quality'] });
    }
  });

  const submitUserFeedback = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    queue,
    isLoadingQueue,
    qualityMetrics,
    isLoadingMetrics,
    reports,
    isLoadingReports,
    submitEvaluation,
    submitUserFeedback
  };
};
