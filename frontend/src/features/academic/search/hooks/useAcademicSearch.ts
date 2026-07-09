import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/search';

interface SearchParams {
  q?: string;
  type?: string;
  status?: string;
  schoolId?: string;
  departmentId?: string;
  courseId?: string;
  page?: number;
  limit?: number;
}

export const useAcademicSearch = (params: SearchParams) => {
  return useQuery({
    queryKey: ['academicSearch', params],
    queryFn: async () => {
      // Don't search if completely empty
      if (!params.q && params.type === 'ALL' && !params.schoolId && !params.departmentId && !params.courseId) {
        return { results: [], pagination: { total: 0, page: 1, limit: params.limit || 20, totalPages: 0 } };
      }
      const { data } = await axios.get(API_BASE, { params });
      return data.data;
    },
    // Keep previous data while fetching new to prevent flicker
    placeholderData: (prev) => prev
  });
};

export const useAutocomplete = (q: string) => {
  return useQuery({
    queryKey: ['academicAutocomplete', q],
    queryFn: async () => {
      if (!q || q.length < 2) return [];
      const { data } = await axios.get(`${API_BASE}/autocomplete`, { params: { q } });
      return data.data;
    },
    enabled: q.length >= 2
  });
};

export const useSearchHistory = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['searchHistory'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/history`);
      return data.data;
    }
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_BASE}/history`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    }
  });

  return { ...query, clearHistory: clearHistory.mutateAsync };
};

export const useSavedSearches = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['savedSearches'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/saved`);
      return data.data;
    }
  });

  const saveSearch = useMutation({
    mutationFn: async (searchData: any) => {
      const { data } = await axios.post(`${API_BASE}/saved`, searchData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedSearches'] });
    }
  });

  return { ...query, saveSearch: saveSearch.mutateAsync };
};
