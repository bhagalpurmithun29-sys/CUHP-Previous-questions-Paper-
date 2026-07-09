import { apiClient } from '../../../lib/axios';
import type { DashboardData, UserProfile, Activity, DashboardStatistics } from '../types/dashboard.types';

export const DashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/dashboard/profile');
    return response.data;
  },

  getActivity: async (): Promise<Activity[]> => {
    const response = await apiClient.get<Activity[]>('/dashboard/activity');
    return response.data;
  },

  getStatistics: async (): Promise<DashboardStatistics> => {
    const response = await apiClient.get<DashboardStatistics>('/dashboard/statistics');
    return response.data;
  },
};
