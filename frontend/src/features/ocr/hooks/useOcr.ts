import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface IOcrResult {
  paperId: string;
  status: string;
  metadata: any;
  sections: any[];
}

export const useGetOcrStats = () => useQuery({
  queryKey: ['ocrStats'],
  queryFn: async () => {
    const res = await axios.get(`${API_URL}/ocr/stats/overview`, { withCredentials: true });
    return res.data.data;
  }
});

export const useGetOcrStatus = (paperId: string) => useQuery({
  queryKey: ['ocrStatus', paperId],
  queryFn: async () => {
    const res = await axios.get(`${API_URL}/ocr/status/${paperId}`, { withCredentials: true });
    return res.data.data;
  },
  enabled: !!paperId
});

export const useGetOcrResult = (paperId: string) => useQuery({
  queryKey: ['ocrResult', paperId],
  queryFn: async () => {
    const res = await axios.get(`${API_URL}/ocr/result/${paperId}`, { withCredentials: true });
    return res.data.data as IOcrResult;
  },
  enabled: !!paperId
});

export const useProcessOcr = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/ocr/start/${paperId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrStats'] });
    }
  });
};

export const useReprocessOcr = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/ocr/reprocess/${paperId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrResult', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrStats'] });
    }
  });
};

export const useUpdateOcrReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ paperId, updates }: { paperId: string, updates: any }) => {
      const res = await axios.put(`${API_URL}/ocr/review/${paperId}`, updates, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', variables.paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrResult', variables.paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrStats'] });
    }
  });
};
