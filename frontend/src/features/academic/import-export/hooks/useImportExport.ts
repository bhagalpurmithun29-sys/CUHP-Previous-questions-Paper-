import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE = '/api/v1/ops';

export const useImportExport = () => {
  const queryClient = useQueryClient();

  const validateImport = useMutation({
    mutationFn: async ({ entityType, records }: { entityType: string, records: any[] }) => {
      const { data } = await axios.post(`${API_BASE}/import/validate`, { entityType, records });
      return data.data;
    }
  });

  const commitImport = useMutation({
    mutationFn: async ({ entityType, validRecords }: { entityType: string, validRecords: any[] }) => {
      const { data } = await axios.post(`${API_BASE}/import/commit`, { entityType, validRecords });
      return data.data;
    },
    onSuccess: () => {
      toast.success('Import completed successfully');
      queryClient.invalidateQueries({ queryKey: ['importHistory'] });
      // Invalidate academic data globally
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Import failed')
  });

  const exportData = useMutation({
    mutationFn: async ({ entityType, format, filters }: any) => {
      const { data } = await axios.get(`${API_BASE}/export`, { params: { entityType, format, ...filters } });
      return data.data;
    }
  });

  const bulkAction = useMutation({
    mutationFn: async ({ action, entityType, ids, updateData }: any) => {
      const { data } = await axios.post(`${API_BASE}/bulk`, { action, entityType, ids, updateData });
      return data.data;
    },
    onSuccess: () => {
      toast.success('Bulk operation completed');
      queryClient.invalidateQueries(); // Simple brute invalidate for safety
    }
  });

  const rollbackImport = useMutation({
    mutationFn: async (transactionId: string) => {
      const { data } = await axios.post(`${API_BASE}/import/rollback`, { transactionId });
      return data.data;
    },
    onSuccess: () => {
      toast.success('Rollback completed successfully');
      queryClient.invalidateQueries();
    }
  });

  const useImportHistory = () => {
    return useQuery({
      queryKey: ['importHistory'],
      queryFn: async () => {
        const { data } = await axios.get(`${API_BASE}/import/history`);
        return data.data;
      }
    });
  };

  return {
    validateImport: validateImport.mutateAsync,
    commitImport: commitImport.mutateAsync,
    exportData: exportData.mutateAsync,
    bulkAction: bulkAction.mutateAsync,
    rollbackImport: rollbackImport.mutateAsync,
    useImportHistory,
    isLoading: validateImport.isPending || commitImport.isPending || exportData.isPending || bulkAction.isPending || rollbackImport.isPending
  };
};
