import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const useAIGateway = () => {
  const getProviders = useQuery({
    queryKey: ['aiProviders'],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/ai-gateway/providers`, { withCredentials: true });
      return res.data.data;
    }
  });

  const chat = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(`${API_URL}/ai-gateway/chat`, data, { withCredentials: true });
      return res.data.data;
    }
  });

  return {
    getProviders,
    chat
  };
};
