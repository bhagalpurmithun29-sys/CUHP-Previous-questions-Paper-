import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/mobile-ai';

export const useMobileAI = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['ai-history'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/history`, getAuthHeaders());
      return res.data.data;
    }
  });

  const startVoiceSession = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/voice/start`, {}, getAuthHeaders());
      return res.data.data;
    }
  });

  const processVoice = useMutation({
    mutationFn: async (payload: { sessionId: string, text: string }) => {
      const res = await axios.post(`\${API_BASE}/voice/process`, payload, getAuthHeaders());
      return res.data.data;
    }
  });

  const executeAction = useMutation({
    mutationFn: async (payload: { action: string, context: any }) => {
      const res = await axios.post(`\${API_BASE}/analyze`, payload, getAuthHeaders());
      return res.data.data;
    }
  });

  const syncHistory = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/history/sync`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ai-history'] })
  });

  return {
    history,
    isHistoryLoading,
    startVoiceSession,
    processVoice,
    executeAction,
    syncHistory
  };
};
