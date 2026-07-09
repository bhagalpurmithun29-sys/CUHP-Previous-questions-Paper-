import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE = '/api/v1/metadata';

export const useMetadata = (paperId: string) => {
  const queryClient = useQueryClient();

  const getMetadata = useQuery({
    queryKey: ['metadata', paperId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${paperId}`);
      return data.data;
    },
    enabled: !!paperId
  });

  const getHistory = useQuery({
    queryKey: ['metadataHistory', paperId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/${paperId}/history`);
      return data.data;
    },
    enabled: !!paperId
  });

  const updateMetadata = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.put(`${API_BASE}/${paperId}`, payload);
      return data.data;
    },
    onSuccess: () => {
      toast.success('Metadata updated successfully');
      queryClient.invalidateQueries({ queryKey: ['metadata', paperId] });
      queryClient.invalidateQueries({ queryKey: ['metadataHistory', paperId] });
      queryClient.invalidateQueries({ queryKey: ['papers', paperId] }); // Refresh global paper cache
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update metadata');
    }
  });

  return {
    metadata: getMetadata,
    history: getHistory,
    updateMetadata: updateMetadata.mutateAsync,
    isUpdating: updateMetadata.isPending
  };
};
