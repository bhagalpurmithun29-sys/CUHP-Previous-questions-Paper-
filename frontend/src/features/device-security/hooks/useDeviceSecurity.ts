import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/device-security';

export const useDeviceSecurity = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: activeSessions, isLoading: isSessionsLoading } = useQuery({
    queryKey: ['active-sessions'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/sessions`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: trustedDevices, isLoading: isDevicesLoading } = useQuery({
    queryKey: ['trusted-devices'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/devices`, getAuthHeaders());
      return res.data.data;
    }
  });

  const revokeSession = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await axios.delete(`\${API_BASE}/sessions/\${sessionId}`, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-sessions'] })
  });

  const revokeOtherSessions = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`\${API_BASE}/sessions/others`, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['active-sessions'] })
  });

  const removeDevice = useMutation({
    mutationFn: async (deviceId: string) => {
      const res = await axios.delete(`\${API_BASE}/devices/\${deviceId}`, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trusted-devices'] })
  });

  const registerWebAuthn = useMutation({
    mutationFn: async () => {
      // Step 1: Call API to get registration options
      // const optionsRes = await axios.get(`\${API_BASE}/webauthn/register-options`);
      // Step 2: Pass options to navigator.credentials.create()
      // const credential = await navigator.credentials.create({ publicKey: optionsRes.data });
      // Step 3: Send credential back to server for verification
      const res = await axios.post(`\${API_BASE}/webauthn/register`, { dummyCredential: true }, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    activeSessions,
    trustedDevices,
    isSessionsLoading,
    isDevicesLoading,
    revokeSession,
    revokeOtherSessions,
    removeDevice,
    registerWebAuthn
  };
};
