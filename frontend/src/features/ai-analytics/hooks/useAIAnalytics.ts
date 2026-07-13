import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/ai-analytics';

export const useAIAnalytics = (filters?: any) => {
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isLoadingOverview } = useQuery({
    queryKey: ['ai-analytics-overview', filters],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: features, isLoading: isLoadingFeatures } = useQuery({
    queryKey: ['ai-analytics-features', filters],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/features`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['ai-analytics-roles', filters],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/roles`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ['ai-analytics-departments', filters],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/departments`, getAuthHeaders());
      return res.data.data;
    }
  });

  const exportReport = useMutation({
    mutationFn: async (data: { type: string, filters: any }) => {
      const res = await axios.post(`\${API_BASE}/export`, data, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    overview,
    isLoadingOverview,
    features,
    isLoadingFeatures,
    roles,
    isLoadingRoles,
    departments,
    isLoadingDepartments,
    exportReport
  };
};
