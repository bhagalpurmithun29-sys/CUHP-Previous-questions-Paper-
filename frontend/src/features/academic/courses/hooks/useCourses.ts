import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/courses';

interface FetchCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  departmentId?: string;
  schoolId?: string;
  degree?: string;
  programType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const useCourses = (params?: FetchCoursesParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (courseData: any) => {
      const { data } = await axios.post(API_BASE, courseData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    }
  });

  return {
    ...query,
    createCourse: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};
