import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/downloads';

export const useOfflineLibrary = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: activeDownloads, isLoading: isDownloadsLoading } = useQuery({
    queryKey: ['active-downloads'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: storageQuota, isLoading: isStorageLoading } = useQuery({
    queryKey: ['storage-quota'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/storage`, getAuthHeaders());
      return res.data.data;
    }
  });

  const startDownload = useMutation({
    mutationFn: async (resourceId: string) => {
      const res = await axios.post(`\${API_BASE}/start`, { resourceId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-downloads'] })
  });

  const pauseDownload = useMutation({
    mutationFn: async (downloadId: string) => {
      const res = await axios.post(`\${API_BASE}/pause`, { downloadId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-downloads'] })
  });

  const resumeDownload = useMutation({
    mutationFn: async (downloadId: string) => {
      const res = await axios.post(`\${API_BASE}/resume`, { downloadId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-downloads'] })
  });

  const cancelDownload = useMutation({
    mutationFn: async (downloadId: string) => {
      const res = await axios.delete(`\${API_BASE}/\${downloadId}`, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-downloads'] })
  });

  return {
    activeDownloads,
    storageQuota,
    isDownloadsLoading,
    isStorageLoading,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload
  };
};
