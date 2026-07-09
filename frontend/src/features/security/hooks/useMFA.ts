import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API_URL = '/api/v1/auth/mfa';

export const useMFASetup = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${API_URL}/setup`);
      return response.data.data; // { secret, qrCode }
    }
  });
};

export const useMFAEnable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post(`${API_URL}/enable`, { token });
      return response.data.data; // { backupCodes }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useMFADisable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axios.post(`${API_URL}/disable`, { token });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });
};

export const useGetTrustedDevices = () => {
  return useQuery({
    queryKey: ['trustedDevices'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/trusted-devices`);
      return response.data.data.devices as any[];
    }
  });
};

export const useRevokeTrustedDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await axios.delete(`${API_URL}/trusted-devices/${deviceId}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trustedDevices'] });
    }
  });
};
