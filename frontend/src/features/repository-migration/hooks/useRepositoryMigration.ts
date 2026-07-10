import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useRepositoryMigration = () => {
  const queryClient = useQueryClient();

  const getHistory = useQuery({
    queryKey: ['migrationHistory'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/migration/history`, { withCredentials: true });
      return res.data.data;
    }
  });

  const importData = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/migration/import`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });
  
  const exportData = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/migration/export`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });
  
  const executeMigration = useMutation({
    mutationFn: async ({ data, dryRun }: { data: any, dryRun: boolean }) => {
      const res = await axios.post(`${API_URL}/migration/migration?dryRun=${dryRun}`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });
  
  const createBackup = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/migration/backup`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });

  const restoreData = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/migration/restore`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });
  
  const syncRepo = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/migration/sync`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['migrationHistory'] })
  });

  return {
    getHistory,
    importData,
    exportData,
    executeMigration,
    createBackup,
    restoreData,
    syncRepo
  };
};
