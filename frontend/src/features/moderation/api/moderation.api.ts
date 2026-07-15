import { apiClient } from '../../../lib/axios';

export const moderationApi = {
  getPendingPapers: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/papers', {
      params: { status: 'PENDING_REVIEW', page, limit }
    });
    return response.data;
  },
  
  getApprovedPapers: async (page = 1, limit = 10) => {
    const response = await apiClient.get('/papers', {
      params: { status: 'APPROVED', page, limit }
    });
    return response.data;
  },

  updatePaperStatus: async (paperId: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await apiClient.patch(`/papers/${paperId}/status`, { status });
    return response.data;
  }
};
