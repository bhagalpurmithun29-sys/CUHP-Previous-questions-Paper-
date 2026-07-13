import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/collaboration-platform';

export const useCollaborationPlatform = () => {
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

  const { data: health, isLoading: isHealthLoading } = useQuery({
    queryKey: ['platform-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
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

  const validateReadiness = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/validate`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-health'] });
    }
  });

  return {
    overview,
    health,
    dependencies,
    isOverviewLoading,
    isHealthLoading,
    isDependenciesLoading,
    validateReadiness
  };
};
