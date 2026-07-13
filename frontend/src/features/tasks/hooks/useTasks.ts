import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/tasks';

export const useTasks = (filters?: any) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: taskData, isLoading } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`\${API_BASE}?\${params}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const createTask = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await axios.post(`\${API_BASE}/\${id}/status`, { status }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const assignTask = useMutation({
    mutationFn: async ({ id, assigneeId }: { id: string, assigneeId: string }) => {
      const res = await axios.post(`\${API_BASE}/\${id}/assign`, { assigneeId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    tasks: taskData?.tasks || [],
    total: taskData?.total || 0,
    isLoading,
    createTask,
    updateStatus,
    assignTask
  };
};
