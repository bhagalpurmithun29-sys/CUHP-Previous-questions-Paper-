import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/courses';

export const useCourse = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const { data } = await axios.put(`${API_BASE}/${id}`, courseData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/archive`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  const restoreMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`${API_BASE}/${id}/restore`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  return {
    ...query,
    updateCourse: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    archiveCourse: archiveMutation.mutateAsync,
    isArchiving: archiveMutation.isPending,
    restoreCourse: restoreMutation.mutateAsync,
    isRestoring: restoreMutation.isPending,
    deleteCourse: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
