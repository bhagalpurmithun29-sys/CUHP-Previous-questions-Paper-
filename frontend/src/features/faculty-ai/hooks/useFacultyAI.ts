import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/faculty-ai';

export const useGenerateQuestions = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`\${API_URL}/generate`, data);
      return response.data.data;
    }
  });
};

export const useAnalyzePaper = () => {
  return useMutation({
    mutationFn: async (data: { questions: any[], subject: string }) => {
      const response = await axios.post(`\${API_URL}/analyze`, data);
      return response.data.data;
    }
  });
};

export const useGenerateRubric = () => {
  return useMutation({
    mutationFn: async (questions: any[]) => {
      const response = await axios.post(`\${API_URL}/rubric`, { questions });
      return response.data.data;
    }
  });
};
