import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/ai-admin';

export const useAIAdministration = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isLoadingOverview } = useQuery({
    queryKey: ['ai-admin-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: health, isLoading: isLoadingHealth } = useQuery({
    queryKey: ['ai-admin-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
      return res.data.data;
    },
    refetchInterval: 15000 // Poll health every 15s
  });

  const { data: alerts, isLoading: isLoadingAlerts } = useQuery({
    queryKey: ['ai-admin-alerts'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/alerts`, getAuthHeaders());
      return res.data.data;
    },
    refetchInterval: 15000 // Poll alerts every 15s
  });

  const { data: config, isLoading: isLoadingConfig } = useQuery({
    queryKey: ['ai-admin-config'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/configuration`, getAuthHeaders());
      return res.data.data;
    }
  });

  const updateConfig = useMutation({
    mutationFn: async (updates: any) => {
      const res = await axios.put(`\${API_BASE}/configuration`, updates, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-admin-config'] });
    }
  });

  const acknowledgeAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const res = await axios.post(`\${API_BASE}/alerts/\${alertId}/acknowledge`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-admin-alerts'] });
    }
  });

  return {
    overview,
    isLoadingOverview,
    health,
    isLoadingHealth,
    alerts,
    isLoadingAlerts,
    config,
    isLoadingConfig,
    updateConfig,
    acknowledgeAlert
  };
};
