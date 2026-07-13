import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/communication-admin';

export const useCommunicationAdmin = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['comm-admin-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: configuration, isLoading: isConfigLoading } = useQuery({
    queryKey: ['comm-admin-config'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/configuration`, getAuthHeaders());
      return res.data.data;
    }
  });

  const updateConfiguration = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.put(`\${API_BASE}/configuration`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comm-admin-config'] });
    }
  });

  return {
    overview: overview || {},
    configuration: configuration || {},
    isOverviewLoading,
    isConfigLoading,
    updateConfiguration
  };
};
