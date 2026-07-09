import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paperApi } from '../api/paper.api';
import toast from 'react-hot-toast';

export const useUploadPaper = () => {
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (variables: { formData: FormData, onProgress: (p: any) => void }) => 
      paperApi.submitUpload(variables.formData, variables.onProgress),
    onSuccess: () => {
      toast.success('Question paper uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload paper. Please try again.');
    }
  });

  const draftMutation = useMutation({
    mutationFn: (variables: { formData: FormData, onProgress: (p: any) => void }) => 
      paperApi.uploadDraft(variables.formData, variables.onProgress),
    onSuccess: () => {
      toast.success('Draft saved successfully!');
    }
  });

  return {
    submitPaper: submitMutation.mutateAsync,
    saveDraft: draftMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    isSavingDraft: draftMutation.isPending
  };
};
