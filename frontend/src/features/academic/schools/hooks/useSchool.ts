import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/schools';

export const useSchool = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['school', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (schoolData: any) => {
      const { data } = await axios.put(`${API_BASE}/${id}`, schoolData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school', id] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/archive`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school', id] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/restore`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school', id] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    }
  });

  return {
    ...query,
    updateSchool: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    archiveSchool: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
    restoreSchool: restoreMutation.mutateAsync,
    isRestoring: restoreMutation.isPending,
    deleteSchool: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
