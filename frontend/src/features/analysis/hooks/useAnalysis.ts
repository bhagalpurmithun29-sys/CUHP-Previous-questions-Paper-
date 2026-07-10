import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAnalysis = (paperId?: string) => {
  const queryClient = useQueryClient();

  const getQueue = useQuery({
    queryKey: ['analysisQueue'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/analysis/queue`, { withCredentials: true });
      return res.data.data;
    },
    refetchInterval: 5000 // Poll queue every 5s
  });

  const getStatus = useQuery({
    queryKey: ['analysisStatus', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/analysis/status/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (data: any) => (data?.status === 'QUEUED' || data?.status === 'PROCESSING') ? 2000 : false
  });

  const getResult = useQuery({
    queryKey: ['analysisResult', paperId],
    queryFn: async () => {
      if (!paperId) return null;
      const res = await axios.get(`${API_URL}/analysis/result/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId && getStatus.data?.status === 'COMPLETED'
  });

  const processPaper = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/analysis/process/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['analysisQueue'] });
      queryClient.invalidateQueries({ queryKey: ['analysisStatus', id] });
    }
  });

  const reprocessPaper = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`${API_URL}/analysis/reprocess/${id}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['analysisQueue'] });
      queryClient.invalidateQueries({ queryKey: ['analysisStatus', id] });
      queryClient.invalidateQueries({ queryKey: ['analysisResult', id] });
    }
  });

  return {
    getQueue,
    getStatus,
    getResult,
    processPaper,
    reprocessPaper
  };
};
