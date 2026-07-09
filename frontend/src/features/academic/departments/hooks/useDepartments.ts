import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/departments';

interface FetchDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  schoolId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useDepartments = (params?: FetchDepartmentsParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['departments', params],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (departmentData: any) => {
      const { data } = await axios.post(API_BASE, departmentData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    }
  });

  return {
    ...query,
    createDepartment: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
