import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/prompt-management';

export const usePromptManagement = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: prompts, isLoading } = useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const res = await axios.get(API_BASE, getAuthHeaders());
      return res.data.data;
    }
  });

  const createPrompt = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] })
  });

  const updatePrompt = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await axios.put(`\${API_BASE}/\${id}`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] })
  });

  const publishVersion = useMutation({
    mutationFn: async ({ id, versionId }: { id: string; versionId: string }) => {
      const res = await axios.post(`\${API_BASE}/\${id}/publish`, { versionId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] })
  });

  const rollbackVersion = useMutation({
    mutationFn: async ({ id, versionId }: { id: string; versionId: string }) => {
      const res = await axios.post(`\${API_BASE}/\${id}/rollback`, { versionId }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['prompts'] })
  });
  
  const testPrompt = useMutation({
    mutationFn: async (data: { content: string; variables: Record<string, string> }) => {
      const res = await axios.post(`\${API_BASE}/test`, data, getAuthHeaders());
      return res.data.data;
    }
  });
  
  const extractVariables = useMutation({
    mutationFn: async (data: { content: string }) => {
      const res = await axios.post(`\${API_BASE}/extract-variables`, data, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    prompts,
    isLoading,
    createPrompt,
    updatePrompt,
    publishVersion,
    rollbackVersion,
    testPrompt,
    extractVariables
  };
};
