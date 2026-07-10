import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useRepositoryIntegrity = () => {
  const queryClient = useQueryClient();

  const getHealth = useQuery({
    queryKey: ['repoHealth'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/integrity/report`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getDuplicates = (page = 1, resolved = false) => useQuery({
    queryKey: ['duplicates', page, resolved],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/integrity/duplicates?page=${page}&resolved=${resolved}`, { withCredentials: true });
      return res.data.data;
    }
  });

  const mergePapers = useMutation({
    mutationFn: async (data: { reportId: string, notes: string }) => {
      const res = await axios.post(`${API_URL}/integrity/merge`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repoHealth'] });
      queryClient.invalidateQueries({ queryKey: ['duplicates'] });
    }
  });

  const scanPaper = useMutation({
    mutationFn: async (paperId: string) => {
      const res = await axios.post(`${API_URL}/integrity/scan`, { paperId }, { withCredentials: true });
      return res.data;
    }
  });

  return {
    healthData: getHealth.data,
    isLoadingHealth: getHealth.isLoading,
    getDuplicates,
    mergePapers,
    scanPaper
  };
};
