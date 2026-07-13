import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE = '/api/v1/messages';

export const useMessaging = (activeConversationId?: string) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: convData, isLoading: isLoadingConvs } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/conversations`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: messagesData, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', activeConversationId],
    queryFn: async () => {
      if (!activeConversationId) return null;
      const res = await axios.get(`\${API_BASE}/\${activeConversationId}`, getAuthHeaders());
      return res.data.data;
    },
    enabled: !!activeConversationId,
    refetchInterval: 5000 // Poll for new messages every 5s instead of WS for now
  });

  const sendMessage = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`\${API_BASE}/send`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeConversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });

  return {
    conversations: convData?.conversations || [],
    messages: messagesData?.messages || [],
    isLoadingConvs,
    isLoadingMessages,
    sendMessage
  };
};
