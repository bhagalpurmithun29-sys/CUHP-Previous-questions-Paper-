import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/subjects';

export const useSubject = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['subject', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (subjectData: any) => {
      const { data } = await axios.put(`${API_BASE}/${id}`, subjectData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject', id] });
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/archive`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject', id] });
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/restore`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject', id] });
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    }
  });

  return {
    ...query,
    updateSubject: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    archiveSubject: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
    restoreSubject: restoreMutation.mutateAsync,
    isRestoring: restoreMutation.isPending,
    deleteSubject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
