import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/mobile-operations';

export const useMobileOperations = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['ops-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: health, isLoading: isHealthLoading } = useQuery({
    queryKey: ['ops-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: incidents, isLoading: isIncidentsLoading } = useQuery({
    queryKey: ['ops-incidents'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/incidents`, getAuthHeaders());
      return res.data.data;
    }
  });

  const createIncident = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post(`\${API_BASE}/incidents`, payload, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ops-incidents'] })
  });

  const getReports = useMutation({
    mutationFn: async () => {
      const res = await axios.get(`\${API_BASE}/reports`, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    overview,
    health,
    incidents,
    isOverviewLoading,
    isHealthLoading,
    isIncidentsLoading,
    createIncident,
    getReports
  };
};
