import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/performance';

export const usePerformance = () => {
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const { data: metrics, isLoading: isMetricsLoading } = useQuery({
    queryKey: ['performance-metrics'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/metrics`, getAuthHeaders());
      return res.data.data;
    }
  });

  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['performance-summary'],
    queryFn: async () => {
      const res = await axios.get(`\${API_BASE}/summary`, getAuthHeaders());
      return res.data.data;
    }
  });

  return {
    metrics,
    summary,
    isMetricsLoading,
    isSummaryLoading
  };
};
