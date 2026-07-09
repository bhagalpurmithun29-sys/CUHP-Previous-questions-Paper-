import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/axios';

export interface ExplorerFilters {
  page: number;
  limit: number;
  search?: string;
  schoolId?: string;
  departmentId?: string;
  courseId?: string;
  semesterId?: string;
  subjectId?: string;
  academicYear?: string;
  examType?: string;
  language?: string;
  sort?: string;
}

export const useExplorer = (filters: ExplorerFilters) => {
  return useQuery({
    queryKey: ['publicPapers', filters],
    queryFn: async () => {
      const { data } = await apiClient.get('/public/papers', { params: filters });
      return data;
    },
    staleTime: 60 * 1000,
  });
};
