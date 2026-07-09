import { create } from 'zustand';
import { SearchFilters } from '../types/search.types';

interface SearchState {
  isOpen: boolean;
  query: string;
  filters: SearchFilters;
  recentSearches: string[];
  setIsOpen: (isOpen: boolean) => void;
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: '',
  filters: {},
  recentSearches: JSON.parse(localStorage.getItem('recentSearches') || '[]'),
  setIsOpen: (isOpen) => set({ isOpen }),
  setQuery: (query) => set({ query }),
  setFilters: (filters) => set({ filters }),
  addRecentSearch: (query) => set((state) => {
    if (!query.trim()) return state;
    const newRecent = [query, ...state.recentSearches.filter(q => q !== query)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    return { recentSearches: newRecent };
  }),
  clearRecentSearches: () => {
    localStorage.removeItem('recentSearches');
    set({ recentSearches: [] });
  },
}));
