import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/onboarding';

export const useOnboardingState = () => {
  return useQuery({
    queryKey: ['onboarding'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data.data;
    }
  });
};

export const useStartOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(API_URL);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['onboarding'], newData);
    }
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (progressData: any) => {
      const { data } = await axios.put(`${API_URL}/progress`, progressData);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['onboarding'], newData);
    }
  });
};

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/complete`);
      return data.data;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['onboarding'], newData);
    }
  });
};
