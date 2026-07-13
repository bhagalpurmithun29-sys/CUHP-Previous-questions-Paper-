import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/workspaces';

export const useWorkspace = (workspaceId?: string) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: workspaces, isLoading: isLoadingWorkspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const res = await axios.get(API_BASE, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: activeWorkspace, isLoading: isLoadingActive } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      const res = await axios.get(`\${API_BASE}/\${workspaceId}`, getAuthHeaders());
      return res.data.data;
    },
    enabled: !!workspaceId
  });

  const createWorkspace = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
    }
  });

  return {
    workspaces: workspaces || [],
    activeWorkspace,
    isLoadingWorkspaces,
    isLoadingActive,
    createWorkspace
  };
};
