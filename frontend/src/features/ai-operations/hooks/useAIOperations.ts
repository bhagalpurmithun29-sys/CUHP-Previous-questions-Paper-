import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAIOperations = () => {
  const getOverview = useQuery({
    queryKey: ['aiOpsOverview'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-operations/overview`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getPipelineHealth = useQuery({
    queryKey: ['aiOpsPipelineHealth'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-operations/pipeline`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getModelMetrics = useQuery({
    queryKey: ['aiOpsModelMetrics'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-operations/models`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getQualityMetrics = useQuery({
    queryKey: ['aiOpsQualityMetrics'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-operations/quality`, { withCredentials: true });
      return res.data.data;
    }
  });

  const getErrorAnalytics = useQuery({
    queryKey: ['aiOpsErrorAnalytics'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-operations/errors`, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getOverview,
    getPipelineHealth,
    getModelMetrics,
    getQualityMetrics,
    getErrorAnalytics
  };
};
