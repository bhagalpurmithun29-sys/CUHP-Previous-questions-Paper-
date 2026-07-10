import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAIMetadata = () => {
  const queryClient = useQueryClient();

  const getStats = useQuery({
    queryKey: ['aiStats'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-metadata/stats/overview`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getMetadata = (paperId: string) => useQuery({
    queryKey: ['aiMetadata', paperId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-metadata/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId
  });

  const processMetadata = useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/ai-metadata/process/${paperId}`, {}, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['aiMetadata', paperId] });
      queryClient.invalidateQueries({ queryKey: ['aiStats'] });
    }
  });
  
  const reviewMetadata = useMutation({
    mutationFn: async ({ paperId, acceptedSuggestions }: { paperId: string, acceptedSuggestions: any }) => {
      const res = await axios.put(`${API_URL}/ai-metadata/review/${paperId}`, { acceptedSuggestions }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aiMetadata', variables.paperId] });
      queryClient.invalidateQueries({ queryKey: ['aiStats'] });
    }
  });

  return {
    getStats,
    getMetadata,
    processMetadata,
    reviewMetadata
  };
};
