import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: any[];
  timestamp: Date;
}

export const useAIChat = (initialConversationId?: string) => {
  const [conversationId, setConversationId] = useState<string | undefined>(initialConversationId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const queryClient = useQueryClient();

  // Load initial conversation history if exists
  const { data: conversation, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['ai-chat-conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return null;
      const { data } = await apiClient.get(`/ai-chat/conversation/${conversationId}`);
      return data.data;
    },
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (conversation && conversation.messages) {
      setMessages(conversation.messages.map((m: any, i: number) => ({
        id: `msg-${i}`,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp)
      })));
    } else if (!conversationId) {
      setMessages([]);
    }
  }, [conversation, conversationId]);

  const sendMessageStream = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsStreaming(true);
    setStatusMessage('Connecting...');

    const assistantMessageId = `ast-${Date.now()}`;
    let assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      citations: [],
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai-chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ conversationId, message: content })
      });

      if (!response.body) throw new Error('ReadableStream not yet supported in this browser.');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        
        // Process SSE lines
        const lines = chunkValue.split('\n');
        for (const line of lines) {
          if (line.startsWith('event: ')) {
            const eventName = line.substring(7);
            const dataLine = lines[lines.indexOf(line) + 1];
            if (dataLine && dataLine.startsWith('data: ')) {
              const dataStr = dataLine.substring(6);
              try {
                const data = JSON.parse(dataStr);
                if (eventName === 'init') {
                  if (!conversationId) {
                    setConversationId(data.conversationId);
                    // Invalidate history to update sidebar
                    queryClient.invalidateQueries({ queryKey: ['ai-chat-history'] });
                  }
                } else if (eventName === 'status') {
                  setStatusMessage(dataStr); // text message
                } else if (eventName === 'citations') {
                  assistantMessage.citations = data;
                  setMessages(prev => prev.map(m => m.id === assistantMessageId ? { ...assistantMessage } : m));
                } else if (eventName === 'chunk') {
                  assistantMessage.content += data.text;
                  setMessages(prev => prev.map(m => m.id === assistantMessageId ? { ...assistantMessage } : m));
                }
              } catch (e) {
                // Ignore empty json parsing or raw text
                if (eventName === 'status') {
                  setStatusMessage(dataStr);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      assistantMessage.content += '\n\n**Error:** Connection lost or failed to generate response.';
      setMessages(prev => prev.map(m => m.id === assistantMessageId ? { ...assistantMessage } : m));
    } finally {
      setIsStreaming(false);
      setStatusMessage('');
    }
  }, [conversationId, isStreaming, queryClient]);

  const clearConversation = useCallback(() => {
    setConversationId(undefined);
    setMessages([]);
  }, []);

  return {
    conversationId,
    setConversationId,
    messages,
    isStreaming,
    statusMessage,
    sendMessageStream,
    isLoadingHistory,
    clearConversation
  };
};

export const useAIChatHistory = () => {
  return useQuery({
    queryKey: ['ai-chat-history'],
    queryFn: async () => {
      const { data } = await apiClient.get('/ai-chat/history');
      return data.data;
    }
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/ai-chat/conversation/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-chat-history'] });
    }
  });
};
