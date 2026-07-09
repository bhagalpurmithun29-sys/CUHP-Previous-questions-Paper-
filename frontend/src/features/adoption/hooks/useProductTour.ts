import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/adoption';

export const useAdoptionState = () => {
  return useQuery({
    queryKey: ['adoption'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/tours`);
      return data.data;
    }
  });
};

export const useUpdateAdoptionProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (progressData: any) => {
      const { data } = await axios.post(`${API_URL}/progress`, progressData);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['adoption'], newData);
    }
  });
};

export const useResetTours = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/reset`);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['adoption'], newData);
    }
  });
};
