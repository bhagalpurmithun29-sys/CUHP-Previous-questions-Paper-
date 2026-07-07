import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSemesters,
  getSemesterById,
  createSemester,
  updateSemester,
  deleteSemester,
  restoreSemester,
  activateSemester
} from '../api/semester.api';
import { SemesterQuery, ISemester } from '../types/semester.types';

export const useSemesters = (query: SemesterQuery) => {
  return useQuery({
    queryKey: ['semesters', query],
    queryFn: () => getSemesters(query),
  });
};

export const useSemester = (id: string) => {
  return useQuery({
    queryKey: ['semester', id],
    queryFn: () => getSemesterById(id),
    enabled: !!id,
  });
};

export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ISemester>) => createSemester(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

export const useUpdateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ISemester> }) => updateSemester(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
      queryClient.invalidateQueries({ queryKey: ['semester', data._id] });
    },
  });
};

export const useDeleteSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSemester(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

export const useRestoreSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => restoreSemester(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};

export const useActivateSemester = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => activateSemester(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    },
  });
};
