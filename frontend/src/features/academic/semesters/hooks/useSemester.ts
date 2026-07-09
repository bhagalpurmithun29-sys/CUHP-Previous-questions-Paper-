import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/semesters';

export const useSemester = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['semester', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (semesterData: any) => {
      const { data } = await axios.put(`${API_BASE}/${id}`, semesterData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semester', id] });
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/archive`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semester', id] });
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/restore`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semester', id] });
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    }
  });

  return {
    ...query,
    updateSemester: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    archiveSemester: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
    restoreSemester: restoreMutation.mutateAsync,
    isRestoring: restoreMutation.isPending,
    deleteSemester: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
