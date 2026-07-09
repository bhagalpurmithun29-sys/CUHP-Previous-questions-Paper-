import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE = '/api/v1/papers';

export const usePaperRepository = (filters: any = {}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['papers', filters],
    queryFn: async () => {
      const { data } = await axios.get(API_BASE, { params: filters });
      return data.data;
    },
    placeholderData: (prev) => prev
  });

  const getPaper = (id: string) => {
    return useQuery({
      queryKey: ['papers', id],
      queryFn: async () => {
        const { data } = await axios.get(`${API_BASE}/${id}`);
        return data.data;
      },
      enabled: !!id
    });
  };

  const createPaper = useMutation({
    mutationFn: async (paperData: any) => {
      const { data } = await axios.post(API_BASE, paperData);
      return data.data;
    },
    onSuccess: () => {
      toast.success('Paper uploaded successfully. Pending review.');
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    }
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { data } = await axios.patch(`${API_BASE}/${id}/status`, { status });
      return data.data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Paper status updated to ${variables.status}`);
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    }
  });

  const deletePaper = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_BASE}/${id}`);
    },
    onSuccess: () => {
      toast.success('Paper deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    }
  });

  return {
    ...query,
    getPaper,
    createPaper: createPaper.mutateAsync,
    updateStatus: updateStatus.mutateAsync,
    deletePaper: deletePaper.mutateAsync,
    isMutating: createPaper.isPending || updateStatus.isPending || deletePaper.isPending
  };
};
