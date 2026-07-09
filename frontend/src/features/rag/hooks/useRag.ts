import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/rag';

export interface Citation {
  citationId: number;
  paperId: string;
  subject: string;
  academicYear: string;
  chunkType: string;
  confidenceScore: number;
  snippet: string;
}

export interface RagResponse {
  answer: string;
  citations: Citation[];
}

export const useQueryRag = () => {
  return useMutation({
    mutationFn: async (question: string) => {
      const response = await axios.post(`\${API_URL}/query`, { question });
      return response.data.data as RagResponse;
    }
  });
};

export const useGetRagStatus = () => {
  return useQuery({
    queryKey: ['ragStatus'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/status`);
      return response.data.data;
    },
    refetchInterval: 10000 // poll every 10s
  });
};

export const useReindexPaper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paperId: string) => {
      const response = await axios.post(`\${API_URL}/reindex`, { paperId });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ragStatus'] });
    }
  });
};
