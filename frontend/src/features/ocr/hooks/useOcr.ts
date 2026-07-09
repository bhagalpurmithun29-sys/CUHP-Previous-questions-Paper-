import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/ocr';

export interface IOcrResult {
  _id: string;
  paperId: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW';
  rawText: string;
  cleanedText: string;
  metadata: {
    subject?: string;
    course?: string;
    semester?: string;
    academicYear?: string;
    examType?: string;
    duration?: string;
    maximumMarks?: number;
  };
  sections: {
    sectionName: string;
    instructions?: string;
    questions: {
      questionNumber: string;
      text: string;
      marks?: number;
    }[];
  }[];
  qualityScore: {
    ocrConfidence: number;
    metadataConfidence: number;
    extractionCompleteness: number;
    overallQuality: number;
  };
  errorMessage?: string;
  moderatorReviewed: boolean;
}

export const useGetOcrStatus = (paperId: string) => {
  return useQuery({
    queryKey: ['ocrStatus', paperId],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/status/\${paperId}`);
      return response.data.data;
    },
    enabled: !!paperId,
    refetchInterval: (query) => {
      return (query.state.data?.status === 'PENDING' || query.state.data?.status === 'PROCESSING') ? 3000 : false;
    }
  });
};

export const useGetOcrResult = (paperId: string) => {
  return useQuery({
    queryKey: ['ocrResult', paperId],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/result/\${paperId}`);
      return response.data.data as IOcrResult;
    },
    enabled: !!paperId,
  });
};

export const useProcessOcr = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paperId: string) => {
      const response = await axios.post(`\${API_URL}/process/\${paperId}`);
      return response.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrResult', paperId] });
    }
  });
};

export const useReprocessOcr = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paperId: string) => {
      const response = await axios.post(`\${API_URL}/reprocess/\${paperId}`);
      return response.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['ocrStatus', paperId] });
      queryClient.invalidateQueries({ queryKey: ['ocrResult', paperId] });
    }
  });
};

export const useUpdateOcrReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ paperId, updates }: { paperId: string, updates: any }) => {
      const response = await axios.put(`\${API_URL}/review/\${paperId}`, updates);
      return response.data.data as IOcrResult;
    },
    onSuccess: (_, { paperId }) => {
      queryClient.invalidateQueries({ queryKey: ['ocrResult', paperId] });
    }
  });
};
