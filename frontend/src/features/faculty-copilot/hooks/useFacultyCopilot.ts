import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/faculty-copilot';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const useFacultyCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  // Queries
  const { data: recommendations, isLoading: isLoadingRecs } = useQuery({
    queryKey: ['facultyRecommendations'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/recommendations`);
      return res.data.data;
    }
  });

  const analyzeCurriculum = useMutation({
    mutationFn: async (payload: { subjectId: string, departmentId: string }) => {
      const res = await axios.post(`${API_BASE}/analyze`, payload);
      return res.data.data;
    }
  });

  const comparePapers = useMutation({
    mutationFn: async (payload: { type: string, sourceId: string, targetId: string }) => {
      const res = await axios.post(`${API_BASE}/compare`, payload);
      return res.data.data;
    }
  });

  const sendChatMessage = useCallback(async (text: string) => {
    const newMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: newMessageId, role: 'user', content: text, timestamp: new Date() }]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: text, conversationId })
      });

      if (!response.body) throw new Error('No stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantMessageId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant', content: '', timestamp: new Date() }]);

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
              setMessages(prev => prev.map(msg => 
                msg.id === assistantMessageId ? { ...msg, content: msg.content + data.text } : msg
              ));
            } else if (data.event === 'end') {
              setIsTyping(false);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  }, [conversationId]);

  return {
    messages,
    isTyping,
    sendChatMessage,
    recommendations,
    isLoadingRecs,
    analyzeCurriculum,
    comparePapers
  };
};
