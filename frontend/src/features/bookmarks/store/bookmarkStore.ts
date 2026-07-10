import { create } from 'zustand';

interface BookmarkStore {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: 'ALL' | 'FAVORITES' | 'PAPER' | 'PAGE' | 'LISTS';
  setActiveFilter: (filter: 'ALL' | 'FAVORITES' | 'PAPER' | 'PAGE' | 'LISTS') => void;
  selectedListId: string | null;
  setSelectedListId: (id: string | null) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  activeFilter: 'ALL',
  setActiveFilter: (f) => set({ activeFilter: f }),
  selectedListId: null,
  setSelectedListId: (id) => set({ selectedListId: id })
}));
