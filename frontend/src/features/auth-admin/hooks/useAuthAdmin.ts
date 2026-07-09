import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/auth-admin';

export const useAuthAdmin = () => {
  const queryClient = useQueryClient();

  const useDashboardAnalytics = () => useQuery({
    queryKey: ['auth-admin', 'dashboard'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/dashboard`);
      return data.data;
    }
  });

  const useAuditLogs = (params: any) => useQuery({
    queryKey: ['auth-admin', 'audit', params],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/audit`, { params });
      return data.data;
    }
  });

  const useSecurityEvents = () => useQuery({
    queryKey: ['auth-admin', 'security-events'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/security`);
      return data.data;
    }
  });

  const useIdentityProviders = () => useQuery({
    queryKey: ['auth-admin', 'providers'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/providers`);
      return data.data;
    }
  });

  const usePasswordPolicy = () => useQuery({
    queryKey: ['auth-admin', 'password-policy'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/policies/password`);
      return data.data;
    }
  });

  const useUpdatePasswordPolicy = () => useMutation({
    mutationFn: async (policy: any) => {
      const { data } = await axios.put(`${API_BASE}/policies/password`, policy);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-admin', 'password-policy'] });
    }
  });

  const useReportGeneration = () => useMutation({
    mutationFn: async ({ type, format }: { type: string, format: string }) => {
      const response = await axios.get(`${API_BASE}/reports`, {
        params: { type, format },
        responseType: format === 'csv' ? 'blob' : 'json'
      });
      return response.data;
    }
  });

  return {
    useDashboardAnalytics,
    useAuditLogs,
    useSecurityEvents,
    useIdentityProviders,
    usePasswordPolicy,
    useUpdatePasswordPolicy,
    useReportGeneration
  };
};
