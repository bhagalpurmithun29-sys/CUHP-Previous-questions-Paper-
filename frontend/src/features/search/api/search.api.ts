import { apiClient } from '@/lib/axios';
import { SearchQuery, SearchResponse, ISearchResult, ISavedSearch } from '../types/search.types';

export const searchApi = {
  globalSearch: async (params: SearchQuery): Promise<SearchResponse> => {
    const { query, page, limit, filters } = params;
    const response = await apiClient.get('/search', {
      params: { q: query, page, limit, ...filters },
    });
    return response.data.data;
  },

  autocomplete: async (query: string): Promise<ISearchResult[]> => {
    const response = await apiClient.get('/search/suggestions', {
      params: { q: query },
    });
    return response.data.data;
  },

  getRecentSearches: async (): Promise<ISavedSearch[]> => {
    const response = await apiClient.get('/search/recent');
    return response.data.data;
  },

  getPinnedSearches: async (): Promise<ISavedSearch[]> => {
    const response = await apiClient.get('/search/pinned');
    return response.data.data;
  },

  togglePinSearch: async (id: string): Promise<ISavedSearch> => {
    const response = await apiClient.patch(`/search/pinned/${id}`);
    return response.data.data;
  },

  clearRecentSearches: async (): Promise<void> => {
    await apiClient.delete('/search/recent');
  },
};
