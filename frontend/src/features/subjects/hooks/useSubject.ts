import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  restoreSubject,
  duplicateSubject
} from '../api/subject.api';
import { SubjectQuery, ISubject } from '../types/subject.types';

export const useSubjects = (query: SubjectQuery) => {
  return useQuery({
    queryKey: ['subjects', query],
    queryFn: () => getSubjects(query),
  });
};

export const useSubject = (id: string) => {
  return useQuery({
    queryKey: ['subject', id],
    queryFn: () => getSubjectById(id),
    enabled: !!id,
  });
};

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ISubject>) => createSubject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ISubject> }) => updateSubject(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      queryClient.invalidateQueries({ queryKey: ['subject', data._id] });
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useRestoreSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => restoreSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useDuplicateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => duplicateSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};
