import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/communication-analytics';

export const useCommunicationAnalytics = (filters?: any) => {

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: overview, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['comm-analytics-overview', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`\${API_BASE}/overview?\${params}`, getAuthHeaders());
      return res.data.data;
    }
  });

  const exportData = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`\${API_BASE}/export`, filters, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    overview: overview || {},
    isOverviewLoading,
    exportData
  };
};
