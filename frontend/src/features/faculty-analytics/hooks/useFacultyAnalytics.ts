import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useFacultyAnalytics = (filters: any) => {
  const getOverview = useQuery({
    queryKey: ['facultyOverview', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/faculty-analytics/overview`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getCurriculum = useQuery({
    queryKey: ['facultyCurriculum', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/faculty-analytics/curriculum`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getAssessment = useQuery({
    queryKey: ['facultyAssessment', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/faculty-analytics/assessment`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getBloom = useQuery({
    queryKey: ['facultyBloom', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/faculty-analytics/bloom`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const getDifficulty = useQuery({
    queryKey: ['facultyDifficulty', filters],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/faculty-analytics/difficulty`, { params: filters, withCredentials: true });
      return res.data.data;
    }
  });

  const exportReport = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/faculty-analytics/export`, data, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getOverview,
    getCurriculum,
    getAssessment,
    getBloom,
    getDifficulty,
    exportReport
  };
};
