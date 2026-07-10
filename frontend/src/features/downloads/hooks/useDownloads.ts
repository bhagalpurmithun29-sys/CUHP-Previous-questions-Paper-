import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDownloadStore } from '../store/downloadStore';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useDownloads = () => {
  const queryClient = useQueryClient();
  const { addToQueue, updateStatus } = useDownloadStore();

  const historyQuery = useQuery({
    queryKey: ['downloads-history'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/downloads/history`, { withCredentials: true });
      return res.data.data;
    }
  });

  const offlineQuery = useQuery({
    queryKey: ['downloads-offline'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/downloads/offline`, { withCredentials: true });
      return res.data.data;
    }
  });

  const singleDownloadMutation = useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/downloads/${paperId}`, {}, { withCredentials: true });
      return res.data.data;
    }
  });

  const batchDownloadMutation = useMutation({
    mutationFn: async (paperIds: string[]) => {
      const res = await axios.post(`${API_URL}/downloads/batch`, { paperIds }, { withCredentials: true });
      return res.data.data;
    }
  });
  
  const removeHistoryMutation = useMutation({
    mutationFn: async (historyId: string) => {
      const res = await axios.delete(`${API_URL}/downloads/history/${historyId}`, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads-history'] });
      queryClient.invalidateQueries({ queryKey: ['downloads-offline'] });
    }
  });

  return {
    history: historyQuery.data,
    offlineLibrary: offlineQuery.data,
    isLoadingHistory: historyQuery.isLoading,
    isLoadingOffline: offlineQuery.isLoading,
    downloadSingle: singleDownloadMutation.mutateAsync,
    downloadBatch: batchDownloadMutation.mutateAsync,
    removeHistory: removeHistoryMutation.mutateAsync,
  };
};
