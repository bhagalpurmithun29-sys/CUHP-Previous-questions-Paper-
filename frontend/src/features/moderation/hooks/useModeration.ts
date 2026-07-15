import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moderationApi } from '../api/moderation.api';
import toast from 'react-hot-toast';

export const usePendingPapers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['pending-papers', page, limit],
    queryFn: () => moderationApi.getPendingPapers(page, limit),
  });
};

export const useApprovedPapers = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['approved-papers', page, limit],
    queryFn: () => moderationApi.getApprovedPapers(page, limit),
  });
};

export const useReviewPaper = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ paperId, status }: { paperId: string, status: 'APPROVED' | 'REJECTED' }) => 
      moderationApi.updatePaperStatus(paperId, status),
    onSuccess: (data, variables) => {
      toast.success(`Paper successfully ${variables.status.toLowerCase()}`);
      queryClient.invalidateQueries({ queryKey: ['pending-papers'] });
      queryClient.invalidateQueries({ queryKey: ['approved-papers'] });
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update paper status.');
    }
  });
};
