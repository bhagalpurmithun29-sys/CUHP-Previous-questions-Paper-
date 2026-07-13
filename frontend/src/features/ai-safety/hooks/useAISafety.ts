import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/ai-safety';

export const useAISafety = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: policies, isLoading: isLoadingPolicies } = useQuery({
    queryKey: ['ai-policies'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/policies`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['ai-events'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/events`, getAuthHeaders());
      return res.data.data;
    },
    refetchInterval: 10000 // Poll for new security events every 10s
  });

  const { data: moderationQueue, isLoading: isLoadingQueue } = useQuery({
    queryKey: ['ai-moderation'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/moderation`, getAuthHeaders());
      return res.data.data;
    }
  });

  const moderateItem = useMutation({
    mutationFn: async (data: { itemId: string; resolution: 'APPROVED' | 'REJECTED' }) => {
      const res = await axios.post(`\${API_BASE}/moderate`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-moderation'] });
      queryClient.invalidateQueries({ queryKey: ['ai-events'] });
    }
  });

  return {
    policies,
    isLoadingPolicies,
    events,
    isLoadingEvents,
    moderationQueue,
    isLoadingQueue,
    moderateItem
  };
};
