import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';
import toast from 'react-hot-toast';

export const useTickets = (query: any) => {
  return useQuery({
    queryKey: ['supportTickets', query],
    queryFn: async () => {
      const { data } = await apiClient.get('/support/tickets', { params: query });
      return data.data;
    },
    staleTime: 60 * 1000,
  });
};

export const useTicketDetails = (id: string) => {
  return useQuery({
    queryKey: ['supportTicket', id],
    queryFn: async () => {
      const { data } = await apiClient.get(`/support/tickets/${id}`);
      return data.data;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await apiClient.post('/support/tickets', payload);
      return data.data;
    },
    onSuccess: () => {
      toast.success('Ticket submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
    },
    onError: () => {
      toast.error('Failed to submit ticket');
    }
  });
};

export const useAddReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await apiClient.post(`/support/tickets/${id}/reply`, payload);
      return data.data;
    },
    onSuccess: (_, { id }) => {
      toast.success('Reply sent');
      queryClient.invalidateQueries({ queryKey: ['supportTicket', id] });
    }
  });
};

export const useCloseTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.post(`/support/tickets/${id}/close`);
      return data.data;
    },
    onSuccess: (_, id) => {
      toast.success('Ticket closed');
      queryClient.invalidateQueries({ queryKey: ['supportTicket', id] });
      queryClient.invalidateQueries({ queryKey: ['supportTickets'] });
    }
  });
};
