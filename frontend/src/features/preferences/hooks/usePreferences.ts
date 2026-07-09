import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/preferences';

export const usePreferences = () => {
  return useQuery({
    queryKey: ['preferences'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data.data;
    }
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: any) => {
      const { data } = await axios.put(API_URL, updates);
      return data.data;
    },
    onSuccess: (newData) => {
      // Optimistically update the cache
      queryClient.setQueryData(['preferences'], newData);
    }
  });
};

export const useResetPreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/reset`);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['preferences'], newData);
    }
  });
};
