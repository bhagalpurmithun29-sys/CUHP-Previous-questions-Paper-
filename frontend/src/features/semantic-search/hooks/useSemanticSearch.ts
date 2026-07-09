import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useSemanticSearch = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const { data } = await apiClient.post('/semantic-search', { query });
      return data.data;
    }
  });
};

export const useSimilarPapers = (paperId?: string) => {
  return useQuery({
    queryKey: ['similarPapers', paperId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/semantic-search/similar/${paperId}`);
      return data.data;
    },
    enabled: !!paperId,
  });
};

export const useIndexStatus = () => {
  return useQuery({
    queryKey: ['semanticIndexStatus'],
    queryFn: async () => {
      const { data } = await apiClient.get('/semantic-search/status');
      return data.data;
    }
  });
};
