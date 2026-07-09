import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/departments';

export const useDepartment = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['department', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (departmentData: any) => {
      const { data } = await axios.put(`${API_BASE}/${id}`, departmentData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', id] });
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/archive`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', id] });
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/restore`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['department', id] });
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    }
  });

  return {
    ...query,
    updateDepartment: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    archiveDepartment: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
    restoreDepartment: restoreMutation.mutateAsync,
    isRestoring: restoreMutation.isPending,
    deleteDepartment: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
