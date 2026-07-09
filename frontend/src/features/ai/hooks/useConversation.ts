import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useConversations = () => {
  return useQuery({
    queryKey: ['aiConversations'],
    queryFn: async () => {
      const { data } = await apiClient.get('/ai/conversations');
      return data.data;
    },
  });
};

export const useConversation = (id: string) => {
  return useQuery({
    queryKey: ['aiConversation', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/ai/conversations/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/ai/conversations/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiConversations'] });
    }
  });
};
