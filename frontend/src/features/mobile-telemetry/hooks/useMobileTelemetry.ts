import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/mobile-telemetry';

export const useMobileTelemetry = () => {
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['telemetry-overview'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/overview`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: syncStats, isLoading: isSyncLoading } = useQuery({
    queryKey: ['telemetry-sync'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/sync`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: storageStats, isLoading: isStorageLoading } = useQuery({
    queryKey: ['telemetry-storage'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/storage`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: networkStats, isLoading: isNetworkLoading } = useQuery({
    queryKey: ['telemetry-network'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/network`, getAuthHeaders());
      return res.data.data;
    }
  });

  const exportReport = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/export`, {}, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    overview,
    syncStats,
    storageStats,
    networkStats,
    isOverviewLoading,
    isSyncLoading,
    isStorageLoading,
    isNetworkLoading,
    exportReport
  };
};
