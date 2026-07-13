import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/calendar';

export const useAcademicCalendar = (filters?: any) => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: events, isLoading } = useQuery({
    queryKey: ['calendar-events', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`\${API_BASE}/events?\${params}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const createEvent = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`\${API_BASE}/events`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    }
  });

  const updateEvent = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await axios.put(`\${API_BASE}/events/\${id}`, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    }
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`\${API_BASE}/events/\${id}`, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    }
  });

  return {
    events: events || [],
    isLoading,
    createEvent,
    updateEvent,
    deleteEvent
  };
};
