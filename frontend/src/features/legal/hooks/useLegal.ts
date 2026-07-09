import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const usePolicies = () => {
  return useQuery({
    queryKey: ['legalPolicies'],
    queryFn: async () => {
      const { data } = await apiClient.get('/legal/policies');
      return data.data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const usePolicy = (slug: string) => {
  return useQuery({
    queryKey: ['legalPolicy', slug],
    queryFn: async () => {
      const { data } = await apiClient.get(`/legal/policies/${slug}`);
      return data.data;
    },
    enabled: !!slug,
    staleTime: 60 * 60 * 1000,
  });
};

export const useUserConsent = (guestId?: string) => {
  return useQuery({
    queryKey: ['userConsent', guestId],
    queryFn: async () => {
      const { data } = await apiClient.get('/legal/consent', { params: { guestId } });
      return data.data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useSaveConsent = () => {
  return useMutation({
    mutationFn: async (payload: { guestId?: string; consents: any[] }) => {
      const { data } = await apiClient.post('/legal/consent', payload);
      return data.data;
    }
  });
};
