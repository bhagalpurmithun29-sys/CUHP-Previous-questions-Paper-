import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/schools';

interface FetchSchoolsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useSchools = (params?: FetchSchoolsParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['schools', params],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (schoolData: any) => {
      const { data } = await axios.post(API_BASE, schoolData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    }
  });

  return {
    ...query,
    createSchool: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
