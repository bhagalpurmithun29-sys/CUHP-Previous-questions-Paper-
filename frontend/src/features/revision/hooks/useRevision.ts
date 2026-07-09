import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/revision';

export interface ITopicProgress {
  topic: string;
  confidenceScore: number;
  lastRevisedAt?: string;
  isCompleted: boolean;
  notes?: string;
  priorityScore: number;
}

export interface ISubjectRevision {
  _id: string;
  userId: string;
  subjectId: string;
  readinessScore: number;
  lastReadinessCalculation: string;
  topics: ITopicProgress[];
  targetExamDate?: string;
  mode: 'NORMAL' | 'LAST_MINUTE_7_DAY' | 'LAST_MINUTE_3_DAY' | 'LAST_MINUTE_24_HR';
  checklist: {
    item: string;
    isDone: boolean;
    _id: string;
  }[];
}

export const useGetRevisionDashboard = (subjectId: string) => {
  return useQuery({
    queryKey: ['revisionDashboard', subjectId],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}?subjectId=\${subjectId}`);
      return response.data.data as ISubjectRevision | null;
    },
    enabled: !!subjectId,
  });
};

export const useUpdateTopicProgress = (subjectId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { topicName: string; confidence: number; isCompleted: boolean }) => {
      const response = await axios.post(`\${API_URL}/progress`, { subjectId, ...data });
      return response.data.data as ISubjectRevision;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revisionDashboard', subjectId] });
    }
  });
};

export const useGenerateLastMinutePlan = (subjectId: string) => {
  return useMutation({
    mutationFn: async (mode: string) => {
      const response = await axios.post(`\${API_URL}/last-minute-plan`, { subjectId, mode });
      return response.data.data;
    }
  });
};

export const useGetRevisionRecommendations = (subjectId: string) => {
  return useQuery({
    queryKey: ['revisionRecommendations', subjectId],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/recommendations?subjectId=\${subjectId}`);
      return response.data.data;
    },
    enabled: !!subjectId,
  });
};
