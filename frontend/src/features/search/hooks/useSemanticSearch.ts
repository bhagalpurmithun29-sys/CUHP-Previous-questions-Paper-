import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export interface SemanticSearchFilters {
  q?: string;
  type?: string;
  mode?: 'keyword' | 'semantic' | 'hybrid';
  school?: string;
  department?: string;
  course?: string;
  semester?: number;
  subject?: string;
  academicYear?: string;
  examSession?: string;
  examType?: string;
  paperType?: string;
  difficulty?: string;
  bloomLevel?: string;
  topic?: string;
  page?: number;
  limit?: number;
}

export const useSemanticSearch = (filters: SemanticSearchFilters) => {
  return useQuery({
    queryKey: ['semanticSearch', filters],
    queryFn: async () => {
      // Choose endpoint based on mode
      const endpoint = filters.mode === 'keyword' 
        ? '/search' 
        : '/semantic-search'; // Assuming semantic-search handles both semantic and hybrid
      
      const payload = filters.mode === 'keyword' 
        ? { params: filters } 
        : { query: filters.q, filters };
      
      const { data } = filters.mode === 'keyword' 
        ? await apiClient.get(endpoint, payload)
        : await apiClient.post(endpoint, payload);
        
      return data.data; // Assumes ApiResponse format
    },
    enabled: (filters.q || '').length > 0 || Object.keys(filters).length > 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSimilarPapers = (paperId: string) => {
  return useQuery({
    queryKey: ['similarPapers', paperId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/semantic-search/similar/${paperId}`);
      return data.data;
    },
    enabled: !!paperId,
    staleTime: 15 * 60 * 1000,
  });
};
