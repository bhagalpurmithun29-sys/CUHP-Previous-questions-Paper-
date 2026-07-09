import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/study-planner';

export interface StudyTask {
  _id: string;
  title: string;
  description?: string;
  topic: string;
  date: string;
  durationMinutes: number;
  type: 'READING' | 'PRACTICE' | 'REVISION' | 'MOCK_TEST';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'MISSED';
  resourceId?: string;
}

export interface StudyPlan {
  _id: string;
  userId: string;
  goal: {
    type: 'EXAM' | 'SEMESTER' | 'REVISION' | 'MASTERY' | 'CUSTOM';
    targetDate?: string;
    subjectId?: string;
    description: string;
  };
  startDate: string;
  endDate: string;
  dailyCommitmentMinutes: number;
  tasks: StudyTask[];
  progress: {
    completedTasks: number;
    totalTasks: number;
    studyTimeMinutes: number;
    completionPercentage: number;
    streak: number;
    lastActiveDate?: string;
  };
  isActive: boolean;
}

export const useGetActivePlan = () => {
  return useQuery({
    queryKey: ['studyPlan', 'active'],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data.data as StudyPlan | null;
    }
  });
};

export const useGeneratePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (goalData: any) => {
      const response = await axios.post(API_URL, goalData);
      return response.data.data as StudyPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyPlan'] });
    }
  });
};

export const useUpdateTaskProgress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ planId, taskId, status }: { planId: string; taskId: string; status: string }) => {
      const response = await axios.put(`\${API_URL}/progress`, { planId, taskId, status });
      return response.data.data as StudyPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyPlan', 'active'] });
    }
  });
};

export const useGetRecommendations = () => {
  return useQuery({
    queryKey: ['studyPlan', 'recommendations'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/recommendations`);
      return response.data.data;
    }
  });
};
