import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/axios';

export const useHelpCategories = () => {
  return useQuery({
    queryKey: ['helpCategories'],
    queryFn: async () => {
      const { data } = await apiClient.get('/help/categories');
      return data.data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useHelpArticles = (query?: string, category?: string) => {
  return useQuery({
    queryKey: ['helpArticles', query, category],
    queryFn: async () => {
      const { data } = await apiClient.get('/help/articles', { params: { q: query, category } });
      return data.data;
    },
    enabled: !!query || !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useHelpArticle = (slug: string) => {
  return useQuery({
    queryKey: ['helpArticle', slug],
    queryFn: async () => {
      const { data } = await apiClient.get(`/help/articles/${slug}`);
      return data.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFaqs = () => {
  return useQuery({
    queryKey: ['helpFaqs'],
    queryFn: async () => {
      const { data } = await apiClient.get('/help/faqs');
      return data.data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: async (payload: { slug: string; isHelpful: boolean; comment?: string }) => {
      const { data } = await apiClient.post('/help/feedback', payload);
      return data;
    }
  });
};
