import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/notifications';

export const useNotifications = (filters?: any) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: notificationData, isLoading } = useQuery({
    queryKey: ['notifications', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`\${API_BASE}?\${params}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: unreadCountData } = useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/unread-count`, getAuthHeaders());
      return res.data.data;
    },
    refetchInterval: 30000 // Poll every 30 seconds
  });

  const { data: preferences, isLoading: isLoadingPrefs } = useQuery({
    queryKey: ['notification-preferences'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/preferences`, getAuthHeaders());
      return res.data.data;
    }
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      await axios.put(`\${API_BASE}/\${id}/read`, {}, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    }
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      await axios.put(`\${API_BASE}/read-all`, {}, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    }
  });

  const archiveNotification = useMutation({
    mutationFn: async (id: string) => {
      await axios.put(`\${API_BASE}/\${id}/archive`, {}, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const deleteNotification = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`\${API_BASE}/\${id}`, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    }
  });

  const updatePreferences = useMutation({
    mutationFn: async (data: any) => {
      await axios.put(`\${API_BASE}/preferences`, data, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-preferences'] });
    }
  });

  return {
    notifications: notificationData?.notifications || [],
    total: notificationData?.total || 0,
    totalPages: notificationData?.totalPages || 0,
    unreadCount: unreadCountData?.count || 0,
    preferences,
    isLoading,
    isLoadingPrefs,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    updatePreferences
  };
};
