import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useVersionHistory = (paperId: string) => {
  const queryClient = useQueryClient();

  const getHistory = useQuery({
    queryKey: ['versionHistory', paperId],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/versions/${paperId}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!paperId
  });

  const getComparison = (v1: string, v2: string) => useQuery({
    queryKey: ['versionCompare', paperId, v1, v2],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/versions/${paperId}/compare?v1=${v1}&v2=${v2}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!v1 && !!v2
  });

  const restoreVersion = useMutation({
    mutationFn: async (versionId: string) => {
      const res = await axios.post(`${API_URL}/versions/${paperId}/restore`, { versionId }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['versionHistory', paperId] })
  });
  
  const approveVersion = useMutation({
    mutationFn: async (versionId: string) => {
      const res = await axios.post(`${API_URL}/versions/${paperId}/approve`, { versionId }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['versionHistory', paperId] })
  });

  return {
    historyData: getHistory.data,
    isLoading: getHistory.isLoading,
    getComparison,
    restoreVersion,
    approveVersion
  };
};
