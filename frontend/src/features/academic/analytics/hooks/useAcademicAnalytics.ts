import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE = '/api/v1/analytics';

export const useAcademicAnalytics = () => {
  const overviewQuery = useQuery({
    queryKey: ['academicAnalytics', 'overview'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/overview`);
      return data.data;
    }
  });

  const growthQuery = useQuery({
    queryKey: ['academicAnalytics', 'growth'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/growth`);
      return data.data;
    }
  });

  const qualityQuery = useQuery({
    queryKey: ['academicAnalytics', 'quality'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE}/data-quality`);
      return data.data;
    }
  });

  const generateReport = useMutation({
    mutationFn: async (options: any) => {
      const { data } = await axios.post(`${API_BASE}/report`, options);
      return data.data;
    },
    onSuccess: () => toast.success('Report generated successfully'),
    onError: () => toast.error('Failed to generate report')
  });

  return {
    overview: overviewQuery,
    growth: growthQuery,
    quality: qualityQuery,
    generateReport: generateReport.mutateAsync,
    isGenerating: generateReport.isPending
  };
};
