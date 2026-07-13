import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/scanner';

export const useScanner = () => {
  const queryClient = useQueryClient();

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer \${localStorage.getItem('token')}` }
  });

  const uploadDocument = useMutation({
    mutationFn: async (payload: { fileData: string, metadata: any }) => {
      // In reality we would use FormData
      const res = await axios.post(`\${API_BASE}/upload`, payload, getAuthHeaders());
      return res.data.data;
    }
  });

  const preprocessImage = useMutation({
    mutationFn: async (payload: { fileData: string, options: any }) => {
      const res = await axios.post(`\${API_BASE}/preprocess`, payload, getAuthHeaders());
      return res.data.data;
    }
  });

  const getScanStatus = async (scanId: string) => {
    const res = await axios.get(`\${API_BASE}/status?scanId=\${scanId}`, getAuthHeaders());
    return res.data.data;
  };

  return {
    uploadDocument,
    preprocessImage,
    getScanStatus
  };
};
