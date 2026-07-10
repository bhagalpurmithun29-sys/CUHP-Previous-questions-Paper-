import { create } from 'zustand';

interface PDFViewerState {
  numPages: number | null;
  pageNumber: number;
  scale: number;
  rotation: number;
  searchText: string;
  isSidebarOpen: boolean;
  activeSidebarTab: 'thumbnails' | 'search' | 'info' | 'ocr' | 'ai';
  isFullscreen: boolean;
  ocrEnabled: boolean;
  
  setNumPages: (pages: number) => void;
  setPageNumber: (page: number) => void;
  setScale: (scale: number | ((prev: number) => number)) => void;
  setRotation: (rotation: number) => void;
  setSearchText: (text: string) => void;
  toggleSidebar: () => void;
  setActiveSidebarTab: (tab: 'thumbnails' | 'search' | 'info' | 'ocr' | 'ai') => void;
  setFullscreen: (isFullscreen: boolean) => void;
  toggleOcr: () => void;
}

export const usePDFViewerStore = create<PDFViewerState>((set) => ({
  numPages: null,
  pageNumber: 1,
  scale: 1.0,
  rotation: 0,
  searchText: '',
  isSidebarOpen: false,
  activeSidebarTab: 'thumbnails',
  isFullscreen: false,
  ocrEnabled: false,

  setNumPages: (pages) => set({ numPages: pages }),
  setPageNumber: (page) => set({ pageNumber: page }),
  setScale: (scale) => set((state) => ({ scale: typeof scale === 'function' ? scale(state.scale) : scale })),
  setRotation: (rotation) => set({ rotation }),
  setSearchText: (text) => set({ searchText: text }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab, isSidebarOpen: true }),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  toggleOcr: () => set((state) => ({ ocrEnabled: !state.ocrEnabled })),
}));
