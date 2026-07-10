import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useOCR = () => {
  const queryClient = useQueryClient();

  const getStats = useQuery({
    queryKey: ['ocrStats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ocr/stats/overview`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getStatus = (paperId: string) => useQuery({
    queryKey: ['ocrStatus', paperId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ocr/status/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId
  });
  
  const getText = (paperId: string) => useQuery({
    queryKey: ['ocrText', paperId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ocr/text/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId
  });

  const startOcr = useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/ocr/start/${paperId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrStats'] });
    }
  });
  
  const reviewOcr = useMutation({
    mutationFn: async ({ paperId, correctedText }: { paperId: string, correctedText: string }) => {
      const res = await axios.put(`${API_URL}/ocr/review/${paperId}`, { correctedText }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', variables.paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrText', variables.paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrStats'] });
    }
  });

  return {
    getStats,
    getStatus,
    getText,
    startOcr,
    reviewOcr
  };
};
