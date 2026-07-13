import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/study-planner';

export const useStudyPlanner = () => {
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading: isLoadingDashboard } = useQuery({
    queryKey: ['studyDashboard'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/dashboard`);
      return res.data.data;
    }
  });

  const { data: weeklyPlan, isLoading: isLoadingWeekly } = useQuery({
    queryKey: ['studyWeeklyPlan'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/weekly`);
      return res.data.data;
    }
  });

  const { data: monthlyPlan, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['studyMonthlyPlan'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/monthly`);
      return res.data.data;
    }
  });

  const { data: revisionPlan, isLoading: isLoadingRevision } = useQuery({
    queryKey: ['studyRevisionPlan'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/revision`);
      return res.data.data;
    }
  });

  const { data: recommendations, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ['studyRecommendations'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/recommendations`);
      return res.data.data;
    }
  });

  const createGoal = useMutation({
    mutationFn: async (goalData: any) => {
      const res = await axios.post(`${API_BASE}/goals`, goalData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyDashboard'] });
      queryClient.invalidateQueries({ queryKey: ['studyWeeklyPlan'] });
      queryClient.invalidateQueries({ queryKey: ['studyMonthlyPlan'] });
    }
  });

  const updateGoal = useMutation({
    mutationFn: async ({ goalId, goalData }: { goalId: string, goalData: any }) => {
      const res = await axios.put(`${API_BASE}/goals/${goalId}`, goalData);
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['studyDashboard'] })
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      await axios.delete(`${API_BASE}/goals/${goalId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['studyDashboard'] })
  });

  return {
    dashboardData, isLoadingDashboard,
    weeklyPlan, isLoadingWeekly,
    monthlyPlan, isLoadingMonthly,
    revisionPlan, isLoadingRevision,
    recommendations, isLoadingRecommendations,
    createGoal, updateGoal, deleteGoal
  };
};
