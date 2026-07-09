import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useAIChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ message, conversationId }: { message: string, conversationId?: string }) => {
      const { data } = await apiClient.post('/ai/chat', { message, conversationId, provider: 'gemini' });
      return data.data;
    },
    onSuccess: (data) => {
      // Refresh conversations list to update title or show new chat
      queryClient.invalidateQueries({ queryKey: ['aiConversations'] });
      // Invalidate current conversation to fetch new messages
      if (data.conversationId) {
        queryClient.invalidateQueries({ queryKey: ['aiConversation', data.conversationId] });
      }
    }
  });
};
