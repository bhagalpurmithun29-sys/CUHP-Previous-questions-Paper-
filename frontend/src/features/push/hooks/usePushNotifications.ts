import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/push';

export const usePushNotifications = () => {
  const queryClient = useQueryClient();
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: pushStatus, isLoading: isStatusLoading } = useQuery({
    queryKey: ['push-status'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/status`, getAuthHeaders());
      return res.data.data;
    }
  });

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      return permission;
    }
    return 'denied';
  };

  const subscribe = useMutation({
    mutationFn: async () => {
      if (permissionStatus !== 'granted') {
        const status = await requestPermission();
        if (status !== 'granted') throw new Error('Permission denied');
      }
      
      // In a real app, generate a web push subscription using applicationServerKey
      const fakeSubscription = { endpoint: 'https://fcm.googleapis.com/fcm/send/fake-endpoint', keys: { p256dh: 'fake', auth: 'fake' } };
      
      const res = await axios.post(`\${API_BASE}/subscribe`, { subscription: fakeSubscription }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push-status'] });
    }
  });

  const unsubscribe = useMutation({
    mutationFn: async () => {
      const endpoint = 'https://fcm.googleapis.com/fcm/send/fake-endpoint';
      const res = await axios.delete(`\${API_BASE}/unsubscribe`, { data: { endpoint }, ...getAuthHeaders() });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push-status'] });
    }
  });

  const testPush = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/test`, {}, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    permissionStatus,
    pushStatus,
    isStatusLoading,
    requestPermission,
    subscribe,
    unsubscribe,
    testPush
  };
};
