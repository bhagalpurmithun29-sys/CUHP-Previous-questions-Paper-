import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useReprocessing = () => {
  const queryClient = useQueryClient();

  const getHistory = useQuery({
    queryKey: ['reprocessingHistory'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/reprocessing/history`, { withCredentials: true });
      return res.data.data;
    }
  });

  const startJob = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/reprocessing/start`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reprocessingHistory'] });
    }
  });

  const retryJob = useMutation({
    mutationFn: async (jobId: string) => {
      const res = await axios.post(`${API_URL}/reprocessing/retry/${jobId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reprocessingHistory'] });
    }
  });

  return {
    getHistory,
    startJob,
    retryJob
  };
};
