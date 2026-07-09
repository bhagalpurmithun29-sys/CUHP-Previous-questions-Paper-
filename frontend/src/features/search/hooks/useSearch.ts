import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import { SearchFilters } from './useSearchFilters';

export const useSearch = (filters: SearchFilters) => {
  return useQuery({
    queryKey: ['globalSearch', filters],
    queryFn: async () => {
      const { data } = await apiClient.get('/search', { params: filters });
      return data.data; // Assumes ApiResponse format
    },
    enabled: filters.q.length > 0 || Object.keys(filters).length > 3, // Don't fetch on totally empty state
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['searchSuggestions', query],
    queryFn: async () => {
      const { data } = await apiClient.get('/search/suggestions', { params: { q: query } });
      return data.data;
    },
    enabled: query.length >= 2,
    staleTime: 60 * 1000,
  });
};

export const useTrendingSearches = () => {
  return useQuery({
    queryKey: ['trendingSearches'],
    queryFn: async () => {
      const { data } = await apiClient.get('/search/trending');
      return data.data;
    },
    staleTime: 15 * 60 * 1000,
  });
};

export const useSearchHistory = () => {
  return useQuery({
    queryKey: ['searchHistory'],
    queryFn: async () => {
      const { data } = await apiClient.get('/search/recent');
      return data.data;
    },
    staleTime: 60 * 1000,
  });
};

export const useSavedSearches = () => {
  return useQuery({
    queryKey: ['savedSearches'],
    queryFn: async () => {
      const { data } = await apiClient.get('/search/pinned');
      return data.data;
    },
  });
};

export const useSaveSearchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { query: string; filters: any }) => {
      const { data } = await apiClient.post('/search/save', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    }
  });
};

export const useClearHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.delete('/search/history');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    }
  });
};

export const useTogglePinSearchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.patch(`/search/pinned/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedSearches'] });
    }
  });
};
