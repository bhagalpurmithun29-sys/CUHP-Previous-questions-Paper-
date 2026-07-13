import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/mobile-platform';

export const useMobilePlatform = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['platform-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: dependencies, isLoading: isDependenciesLoading } = useQuery({
    queryKey: ['platform-dependencies'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/dependencies`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: readiness, isLoading: isReadinessLoading } = useQuery({
    queryKey: ['platform-readiness'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/readiness`, getAuthHeaders());
      return res.data.data;
    }
  });

  const validateWorkflow = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post(`\${API_BASE}/validate`, payload, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['platform-readiness'] })
  });

  return {
    overview,
    dependencies,
    readiness,
    isOverviewLoading,
    isDependenciesLoading,
    isReadinessLoading,
    validateWorkflow
  };
};
