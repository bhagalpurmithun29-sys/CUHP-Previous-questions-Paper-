import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useModeration = (filters = {}) => {
  const queryClient = useQueryClient();

  const getReports = useQuery({
    queryKey: ['reports', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/moderation-queue/reports`, { 
        params: filters,
        withCredentials: true 
      });
      return res.data.data;
    }
  });

  const getReportById = (id: string) => useQuery({
    queryKey: ['report', id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/moderation-queue/reports/${id}`, { withCredentials: true });
      return res.data.data;
    },
    enabled: !!id
  });

  const createReport = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/moderation-queue/reports`, data, { withCredentials: true });
      return res.data.data;
    }
  });

  const assignModerator = useMutation({
    mutationFn: async ({ id, assigneeId }: { id: string, assigneeId: string }) => {
      const res = await axios.post(`${API_URL}/moderation-queue/reports/${id}/assign`, { assigneeId }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] })
  });

  const approveReport = useMutation({
    mutationFn: async ({ id, notes }: { id: string, notes: string }) => {
      const res = await axios.post(`${API_URL}/moderation-queue/reports/${id}/approve`, { notes }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] })
  });

  const rejectReport = useMutation({
    mutationFn: async ({ id, notes }: { id: string, notes: string }) => {
      const res = await axios.post(`${API_URL}/moderation-queue/reports/${id}/reject`, { notes }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] })
  });
  
  const escalateReport = useMutation({
    mutationFn: async ({ id, reason }: { id: string, reason: string }) => {
      const res = await axios.post(`${API_URL}/moderation-queue/reports/${id}/escalate`, { reason }, { withCredentials: true });
      return res.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] })
  });

  return {
    reportsData: getReports.data,
    isLoading: getReports.isLoading,
    getReportById,
    createReport,
    assignModerator,
    approveReport,
    rejectReport,
    escalateReport
  };
};
