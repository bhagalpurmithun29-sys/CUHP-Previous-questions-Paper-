import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/navigation';

export const useHierarchyTree = (parentId?: string, type?: string) => {
  return useQuery({
    queryKey: ['hierarchy', 'tree', parentId, type],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/tree`, { params: { parentId, type } });
      return data.data;
    }
  });
};

export const useBreadcrumbs = (id?: string, type?: string) => {
  return useQuery({
    queryKey: ['hierarchy', 'breadcrumbs', id, type],
    queryFn: async () => {
      if (!id || !type) return [];
      const { data } = await axios.get(`${API_BASE}/breadcrumbs`, { params: { id, type } });
      return data.data;
    },
    enabled: !!id && !!type
  });
};

export const useFavorites = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ['hierarchy', 'favorites'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/favorites`);
      return data.data;
    }
  });

  const addFavorite = useMutation({
    mutationFn: async ({ nodeId, type }: { nodeId: string, type: string }) => {
      await axios.post(`${API_BASE}/favorites`, { nodeId, type });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hierarchy', 'favorites'] })
  });

  const removeFavorite = useMutation({
    mutationFn: async (nodeId: string) => {
      await axios.delete(`${API_BASE}/favorites/${nodeId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hierarchy', 'favorites'] })
  });

  return {
    ...query,
    addFavorite: addFavorite.mutateAsync,
    removeFavorite: removeFavorite.mutateAsync
  };
};

export const useRecentItems = () => {
  return useQuery({
    queryKey: ['hierarchy', 'recent'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/recent`);
      return data.data;
    }
  });
};
