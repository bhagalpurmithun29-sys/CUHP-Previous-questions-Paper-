import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/announcements';

export const useAnnouncements = (filters?: any) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: announcementData, isLoading } = useQuery({
    queryKey: ['announcements', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`\${API_BASE}?\${params}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const createAnnouncement = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  const updateAnnouncement = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await axios.put(`\${API_BASE}/\${id}`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  const publishAnnouncement = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`\${API_BASE}/\${id}/publish`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  const acknowledgeAnnouncement = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`\${API_BASE}/\${id}/acknowledge`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  const deleteAnnouncement = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`\${API_BASE}/\${id}`, getAuthHeaders());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    }
  });

  return {
    announcements: announcementData?.announcements || [],
    total: announcementData?.total || 0,
    totalPages: announcementData?.totalPages || 0,
    isLoading,
    createAnnouncement,
    updateAnnouncement,
    publishAnnouncement,
    acknowledgeAnnouncement,
    deleteAnnouncement
  };
};
