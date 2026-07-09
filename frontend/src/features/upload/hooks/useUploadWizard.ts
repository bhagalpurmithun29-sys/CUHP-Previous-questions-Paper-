import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const API_BASE = '/api/v1/uploads';

export const useUploadWizard = () => {
  const navigate = useNavigate();

  const getHistory = useQuery({
    queryKey: ['uploadHistory'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/history`);
      return data.data;
    }
  });

  const submitUpload = useMutation({
    mutationFn: async (payload: any) => {
      // In a real app, this would use FormData to include the File object
      const { data } = await axios.post(API_BASE, payload);
      return data.data;
    },
    onSuccess: () => {
      toast.success('Paper uploaded successfully! Background processing initiated.');
      navigate('/admin/papers');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to upload paper');
    }
  });

  return {
    history: getHistory,
    submitUpload: submitUpload.mutateAsync,
    isUploading: submitUpload.isPending
  };
};
