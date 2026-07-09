import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/security';

export const useSecurityOverview = () => {
  return useQuery({
    queryKey: ['security', 'overview'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/overview`);
      return data.data;
    }
  });
};

export const useSecuritySessions = () => {
  return useQuery({
    queryKey: ['security', 'sessions'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/sessions`);
      return data.data;
    }
  });
};

export const useSecurityDevices = () => {
  return useQuery({
    queryKey: ['security', 'devices'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/devices`);
      return data.data;
    }
  });
};

export const useLoginHistory = () => {
  return useQuery({
    queryKey: ['security', 'login-history'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/login-history`);
      return data.data;
    }
  });
};

export const useSecurityEvents = () => {
  return useQuery({
    queryKey: ['security', 'events'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/events`);
      return data.data;
    }
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      await axios.delete(`${API_URL}/sessions/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'sessions'] });
      queryClient.invalidateQueries({ queryKey: ['security', 'overview'] });
    }
  });
};

export const useRevokeAllSessions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axios.delete(`${API_URL}/sessions`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'sessions'] });
      queryClient.invalidateQueries({ queryKey: ['security', 'overview'] });
    }
  });
};

export const useRevokeDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (deviceId: string) => {
      await axios.delete(`${API_URL}/devices/${deviceId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'devices'] });
      queryClient.invalidateQueries({ queryKey: ['security', 'overview'] });
    }
  });
};

export const useRenameDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ deviceId, name }: { deviceId: string; name: string }) => {
      await axios.patch(`${API_URL}/devices/${deviceId}`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security', 'devices'] });
    }
  });
};
