import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/account';

export const useAccountProfile = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data.data;
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updates: any) => {
      const { data } = await axios.put(API_URL, updates);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['account'], newData);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const { data } = await axios.post(`${API_URL}/avatar`, { fileUrl });
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['account'], newData);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useRemoveAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`${API_URL}/avatar`);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['account'], newData);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useExportData = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/export`);
      return data.data;
    }
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(API_URL);
      return data.data;
    }
  });
};
