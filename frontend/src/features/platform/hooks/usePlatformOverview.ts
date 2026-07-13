import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/platform';

export const usePlatformOverview = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isLoadingOverview } = useQuery({
    queryKey: ['platform-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: health, isLoading: isLoadingHealth } = useQuery({
    queryKey: ['platform-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
      return res.data.data;
    },
    refetchInterval: 30000
  });

  const { data: dependencies, isLoading: isLoadingDeps } = useQuery({
    queryKey: ['platform-dependencies'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/dependencies`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: workflows, isLoading: isLoadingWorkflows } = useQuery({
    queryKey: ['platform-workflows'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/workflows`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: readiness, isLoading: isLoadingReadiness } = useQuery({
    queryKey: ['platform-readiness'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/readiness`, getAuthHeaders());
      return res.data.data;
    }
  });

  const updateFlag = useMutation({
    mutationFn: async (data: { flag: string; enabled: boolean }) => {
      const res = await axios.post(`\${API_BASE}/flags`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-overview'] });
    }
  });

  return {
    overview,
    health,
    dependencies,
    workflows,
    readiness,
    isLoading: isLoadingOverview || isLoadingHealth || isLoadingDeps || isLoadingWorkflows || isLoadingReadiness,
    updateFlag
  };
};
