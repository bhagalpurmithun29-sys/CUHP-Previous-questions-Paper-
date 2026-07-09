import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/executive';

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['executiveDashboard'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/dashboard`);
      return response.data.data;
    }
  });
};

export const useGetInsights = () => {
  return useQuery({
    queryKey: ['executiveInsights'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/insights`);
      return response.data.data;
    }
  });
};

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: async (format: string) => {
      const response = await axios.post(`\${API_URL}/report`, { format });
      return response.data.data;
    }
  });
};
