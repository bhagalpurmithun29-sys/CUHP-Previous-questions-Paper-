import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useBulkAnalysis = () => {
  const queryClient = useQueryClient();

  const getHistory = useQuery({
    queryKey: ['bulkHistory'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/bulk-analysis/history`, { withCredentials: true });
      return res.data.data;
    }
  });

  const startJob = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/bulk-analysis/start`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulkHistory'] });
    }
  });

  const cancelJob = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await axios.post(`${API_URL}/bulk-analysis/cancel/${jobId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bulkHistory'] });
    }
  });

  return {
    getHistory,
    startJob,
    cancelJob
  };
};
