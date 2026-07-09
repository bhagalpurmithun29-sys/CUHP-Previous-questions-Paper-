import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/subjects';

interface FetchSubjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  semesterId?: string;
  courseId?: string;
  departmentId?: string;
  subjectType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useSubjects = (params?: FetchSubjectsParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['subjects', params],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (subjectData: any) => {
      const { data } = await axios.post(API_BASE, subjectData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    }
  });

  return {
    ...query,
    createSubject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
