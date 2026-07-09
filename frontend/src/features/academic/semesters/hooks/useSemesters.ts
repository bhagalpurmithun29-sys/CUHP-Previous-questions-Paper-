import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/semesters';

interface FetchSemestersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  courseId?: string;
  academicSession?: string;
  isCurrentSemester?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useSemesters = (params?: FetchSemestersParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['semesters', params],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (semesterData: any) => {
      const { data } = await axios.post(API_BASE, semesterData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] });
    }
  });

  return {
    ...query,
    createSemester: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
