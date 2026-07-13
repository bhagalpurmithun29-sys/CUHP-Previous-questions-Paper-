import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: any[];
}

export const usePaperQA = (paperId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['paperQaHistory', paperId],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/paper-qa/history/${paperId}`);
      return res.data.data;
    },
    enabled: !!paperId
  });

  const sendMessage = useCallback(async (text: string, context?: any) => {
    const newMessageId = Date.now().toString();
    const newUserMsg: Message = { id: newMessageId, role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      // Setup SSE for streaming response
      const response = await fetch('/api/v1/paper-qa/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // assuming token is in localStorage
        },
        body: JSON.stringify({
          paperId,
          message: text,
          context,
          conversationId
        })
      });

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: 'assistant', content: '', timestamp: new Date() }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.event === 'start' && data.conversationId) {
              setConversationId(data.conversationId);
            } else if (data.event === 'token') {
              setMessages((prev) => 
                prev.map((msg) => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: msg.content + data.text }
                    : msg
                )
              );
            } else if (data.event === 'end') {
              setIsTyping(false);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  }, [paperId, conversationId]);

  const summarizeDocument = useMutation({
    mutationFn: async (params: { type: string, pageNumber?: number, section?: string }) => {
      const res = await axios.post('/api/v1/paper-qa/summarize', { paperId, ...params });
      return res.data.data;
    }
  });

  const analyzeSelection = useMutation({
    mutationFn: async (params: { text: string, pageNumber?: number, questionNumber?: string }) => {
      const res = await axios.post('/api/v1/paper-qa/selection', { paperId, ...params });
      return res.data.data;
    }
  });

  return {
    messages,
    setMessages,
    isTyping,
    sendMessage,
    summarizeDocument,
    analyzeSelection,
    history,
    isHistoryLoading,
    selectedText,
    setSelectedText
  };
};
