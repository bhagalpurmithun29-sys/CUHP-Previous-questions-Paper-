import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/mobile-admin';

export const useMobileAdministration = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: fleetStatus, isLoading: isFleetLoading } = useQuery({
    queryKey: ['admin-fleet'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/fleet`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: health, isLoading: isHealthLoading } = useQuery({
    queryKey: ['admin-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
      return res.data.data;
    }
  });

  const updateConfiguration = useMutation({
    mutationFn: async (updates: any) => {
      const res = await axios.put(`\${API_BASE}/configuration`, updates, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-overview'] })
  });

  const updatePolicies = useMutation({
    mutationFn: async (updates: any) => {
      const res = await axios.put(`\${API_BASE}/policies`, updates, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-overview'] })
  });

  return {
    overview,
    fleetStatus,
    health,
    isOverviewLoading,
    isFleetLoading,
    isHealthLoading,
    updateConfiguration,
    updatePolicies
  };
};
