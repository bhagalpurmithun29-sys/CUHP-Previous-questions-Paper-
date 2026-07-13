import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/diagnostics';

export const useDeviceDiagnostics = () => {
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['diagnostics-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: capabilities, isLoading: isCapabilitiesLoading } = useQuery({
    queryKey: ['diagnostics-capabilities'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/capabilities`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: compatibility, isLoading: isCompatibilityLoading } = useQuery({
    queryKey: ['diagnostics-compatibility'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/compatibility`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: health, isLoading: isHealthLoading } = useQuery({
    queryKey: ['diagnostics-health'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/health`, getAuthHeaders());
      return res.data.data;
    }
  });

  const reportCapabilities = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post(`\${API_BASE}/report`, payload, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    overview,
    capabilities,
    compatibility,
    health,
    isOverviewLoading,
    isCapabilitiesLoading,
    isCompatibilityLoading,
    isHealthLoading,
    reportCapabilities
  };
};
