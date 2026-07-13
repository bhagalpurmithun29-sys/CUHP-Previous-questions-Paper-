import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/reviews';

export const useReviewWorkspace = (resourceId?: string, activeThreadId?: string) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: threads, isLoading: isLoadingThreads } = useQuery({
    queryKey: ['review-threads', resourceId],
    queryFn: async () => {
      if (!resourceId) return [];
      const res = await axios.get(`\${API_BASE}/threads/\${resourceId}`, getAuthHeaders());
      return res.data.data;
    },
    enabled: !!resourceId
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ['review-comments', activeThreadId],
    queryFn: async () => {
      if (!activeThreadId) return [];
      const res = await axios.get(`\${API_BASE}/comments/\${activeThreadId}`, getAuthHeaders());
      return res.data.data;
    },
    enabled: !!activeThreadId,
    refetchInterval: 5000 // Temporary WS alternative
  });

  const createThread = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`\${API_BASE}/thread`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review-threads', resourceId] });
    }
  });

  const addComment = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`\${API_BASE}/comment`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review-comments', activeThreadId] });
    }
  });

  const resolveThread = useMutation({
    mutationFn: async (threadId: string) => {
      const res = await axios.post(`\${API_BASE}/resolve/\${threadId}`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review-threads', resourceId] });
    }
  });

  return {
    threads: threads || [],
    comments: comments || [],
    isLoadingThreads,
    isLoadingComments,
    createThread,
    addComment,
    resolveThread
  };
};
