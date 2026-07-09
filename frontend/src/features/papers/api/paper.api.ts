import { apiClient } from '@/lib/axios';

export const paperApi = {
  uploadDraft: async (formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    const response = await apiClient.post('/question-papers/draft', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
    return response.data.data;
  },

  submitUpload: async (formData: FormData, onUploadProgress?: (progressEvent: any) => void) => {
    const response = await apiClient.post('/question-papers/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
    return response.data.data;
  },

  updatePaper: async (id: string, formData: FormData) => {
    const response = await apiClient.put(`/question-papers/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  },

  deletePaper: async (id: string) => {
    const response = await apiClient.delete(`/question-papers/${id}`);
    return response.data;
  },

  getUploadStatus: async (id: string) => {
    const response = await apiClient.get(`/question-papers/upload/status/${id}`);
    return response.data.data;
  }
};
