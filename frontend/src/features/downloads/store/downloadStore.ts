import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DownloadItem {
  id: string; // Paper ID
  title: string;
  url?: string;
  status: 'PENDING' | 'DOWNLOADING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  progress: number;
  size: number; // bytes
  error?: string;
}

interface DownloadStore {
  queue: DownloadItem[];
  addToQueue: (item: DownloadItem) => void;
  removeFromQueue: (id: string) => void;
  updateStatus: (id: string, status: DownloadItem['status'], progress?: number, error?: string) => void;
  clearCompleted: () => void;
}

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set) => ({
      queue: [],
      addToQueue: (item) => set((state) => ({ 
        queue: state.queue.find(q => q.id === item.id) 
          ? state.queue 
          : [...state.queue, item] 
      })),
      removeFromQueue: (id) => set((state) => ({ queue: state.queue.filter((item) => item.id !== id) })),
      updateStatus: (id, status, progress, error) => set((state) => ({
        queue: state.queue.map((item) => 
          item.id === id 
            ? { ...item, status, ...(progress !== undefined && { progress }), ...(error && { error }) }
            : item
        )
      })),
      clearCompleted: () => set((state) => ({ queue: state.queue.filter(item => item.status !== 'COMPLETED') })),
    }),
    {
      name: 'cuhp-download-queue',
    }
  )
);
