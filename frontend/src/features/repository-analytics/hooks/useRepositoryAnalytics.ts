import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useRepositoryAnalytics = () => {
  const getOverview = useQuery({
    queryKey: ['repoOverview'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/repository-analytics/overview`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getUploads = useQuery({
    queryKey: ['repoUploads'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/repository-analytics/uploads`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getOcr = useQuery({
    queryKey: ['repoOcr'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/repository-analytics/ocr`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getAi = useQuery({
    queryKey: ['repoAi'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/repository-analytics/ai`, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getOverview,
    getUploads,
    getOcr,
    getAi
  };
};
