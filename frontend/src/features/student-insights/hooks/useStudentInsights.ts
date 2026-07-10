import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useStudentInsights = () => {
  const getDashboard = useQuery({
    queryKey: ['studentDashboard'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/student-insights/dashboard`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getTopics = useQuery({
    queryKey: ['studentTopics'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/student-insights/topics`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getRevision = useQuery({
    queryKey: ['studentRevision'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/student-insights/revision`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getProfile = useQuery({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/student-insights/profile`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getRecommendations = useQuery({
    queryKey: ['studentRecommendations'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/student-insights/recommendations`, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getDashboard,
    getTopics,
    getRevision,
    getProfile,
    getRecommendations
  };
};
