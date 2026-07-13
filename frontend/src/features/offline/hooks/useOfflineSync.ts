import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/sync';

export const useOfflineSync = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: syncStatus, isLoading: isStatusLoading } = useQuery({
    queryKey: ['sync-status'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/status`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: syncHistory, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['sync-history'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/history`, getAuthHeaders());
      return res.data.data;
    }
  });

  const startSync = useMutation({
    mutationFn: async (payload: any = { offlineActions: [] }) => {
      // In a real implementation, this payload would come from IndexedDB queues
      const res = await axios.post(`\${API_BASE}/start`, payload, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sync-status'] });
      queryClient.invalidateQueries({ queryKey: ['sync-history'] });
    }
  });

  const resolveConflicts = useMutation({
    mutationFn: async (conflicts: any[]) => {
      const res = await axios.post(`\${API_BASE}/conflicts/resolve`, { conflicts }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sync-status'] });
      queryClient.invalidateQueries({ queryKey: ['sync-history'] });
    }
  });

  return {
    syncStatus,
    syncHistory,
    isStatusLoading,
    isHistoryLoading,
    startSync,
    resolveConflicts
  };
};
