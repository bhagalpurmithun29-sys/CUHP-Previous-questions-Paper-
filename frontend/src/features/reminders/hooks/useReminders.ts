import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/reminders';

export const useReminders = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: reminders, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const res = await axios.get(API_BASE, getAuthHeaders());
      return res.data.data;
    }
  });

  const createReminder = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(API_BASE, data, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  const snoozeReminder = useMutation({
    mutationFn: async ({ id, minutes }: { id: string, minutes: number }) => {
      const res = await axios.post(`\${API_BASE}/\${id}/snooze`, { minutes }, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  const completeReminder = useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`\${API_BASE}/\${id}/complete`, {}, getAuthHeaders());
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    }
  });

  return {
    reminders: reminders || [],
    isLoading,
    createReminder,
    snoozeReminder,
    completeReminder
  };
};
