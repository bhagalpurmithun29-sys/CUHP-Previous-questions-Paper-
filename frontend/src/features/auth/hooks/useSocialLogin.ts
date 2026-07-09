import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assume this exists based on the prompt "Reuse Auth Context"

const API_URL = '/api/v1/auth/oauth';

export const useGetProviders = () => {
  return useQuery({
    queryKey: ['oauthProviders'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/providers`);
      return response.data.data.providers as string[];
    }
  });
};

export const useInitiateOAuth = () => {
  return useMutation({
    mutationFn: async (provider: string) => {
      const response = await axios.get(`${API_URL}/${provider}`);
      // Redirect to the authorization URL
      window.location.href = response.data.data.url;
    }
  });
};

export const useLinkAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ provider, code, state }: { provider: string; code: string; state: string }) => {
      const response = await axios.post(`${API_URL}/link/${provider}`, { code, state });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useUnlinkAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (provider: string) => {
      const response = await axios.delete(`${API_URL}/unlink/${provider}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};
