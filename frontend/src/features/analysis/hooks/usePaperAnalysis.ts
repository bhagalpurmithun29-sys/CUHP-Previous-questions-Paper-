import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/analysis';

export interface TopicBreakdown {
  topic: string;
  percentage: number;
  description: string;
}

export interface ExamPattern {
  section: string;
  marks: number;
  questionCount: number;
  type: 'OBJECTIVE' | 'SUBJECTIVE' | 'MIXED';
}

export interface RepeatedTopic {
  topic: string;
  frequency: number;
}

export interface PaperAnalysisData {
  _id: string;
  paperId: string;
  subjectId: string;
  overallDifficulty: 'EASY' | 'MEDIUM' | 'HARD';
  topicBreakdown: TopicBreakdown[];
  keyConcepts: string[];
  examPattern: ExamPattern[];
  repeatedTopics: RepeatedTopic[];
  importantTopics: string[];
  preparationTips: string[];
  summary: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  error?: string;
  processedAt?: string;
}

export const useGetPaperAnalysis = (paperId: string) => {
  return useQuery({
    queryKey: ['paperAnalysis', paperId],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/paper/\${paperId}`);
      return response.data.data as PaperAnalysisData | null;
    },
    enabled: !!paperId,
    refetchInterval: (query) => {
      // Poll if status is processing
      return query.state.data?.status === 'PROCESSING' || query.state.data?.status === 'PENDING' ? 3000 : false;
    }
  });
};

export const useTriggerReanalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paperId: string) => {
      const response = await axios.post(`\${API_URL}/reanalyze/\${paperId}`);
      return response.data.data;
    },
    onSuccess: (_, paperId) => {
      queryClient.invalidateQueries({ queryKey: ['paperAnalysis', paperId] });
    }
  });
};
