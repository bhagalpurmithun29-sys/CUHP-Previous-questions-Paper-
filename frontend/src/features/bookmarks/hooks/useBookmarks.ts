import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useBookmarks = () => {
  const queryClient = useQueryClient();

  const getBookmarks = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/bookmarks`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getReadingLists = useQuery({
    queryKey: ['reading-lists'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/bookmarks/reading-lists`, { withCredentials: true });
      return res.data.data;
    }
  });

  const addBookmark = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/bookmarks`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
  });

  const updateBookmark = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await axios.put(`${API_URL}/bookmarks/${id}`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
  });

  const removeBookmark = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/bookmarks/${id}`, { withCredentials: true });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
  });
  
  const createList = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/bookmarks/reading-lists`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reading-lists'] })
  });

  return {
    bookmarks: getBookmarks.data || [],
    readingLists: getReadingLists.data || [],
    isLoading: getBookmarks.isLoading || getReadingLists.isLoading,
    addBookmark,
    updateBookmark,
    removeBookmark,
    createList
  };
};
