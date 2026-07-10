import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useCollections = () => {
  const queryClient = useQueryClient();

  const getCollections = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/collections`, { withCredentials: true });
      return res.data.data;
    }
  });

  const createCollection = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/collections`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['collections'] })
  });

  const updateCollection = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await axios.put(`${API_URL}/collections/${id}`, data, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['collections'] })
  });

  const deleteCollection = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/collections/${id}`, { withCredentials: true });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['collections'] })
  });

  return {
    collections: getCollections.data,
    isLoading: getCollections.isLoading,
    createCollection,
    updateCollection,
    deleteCollection
  };
};
