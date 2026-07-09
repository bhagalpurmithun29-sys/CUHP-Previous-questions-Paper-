import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface SearchFilters {
  q: string;
  type?: string;
  school?: string;
  department?: string;
  course?: string;
  semester?: string;
  subject?: string;
  academicYear?: string;
  examType?: string;
  language?: string;
  status?: string;
  uploader?: string;
  page: number;
  limit: number;
  sort?: string;
}

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL
  const [filters, setFilters] = useState<SearchFilters>({
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || '',
    school: searchParams.get('school') || '',
    department: searchParams.get('department') || '',
    course: searchParams.get('course') || '',
    semester: searchParams.get('semester') || '',
    subject: searchParams.get('subject') || '',
    academicYear: searchParams.get('academicYear') || '',
    examType: searchParams.get('examType') || '',
    language: searchParams.get('language') || '',
    status: searchParams.get('status') || '',
    uploader: searchParams.get('uploader') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '10'),
    sort: searchParams.get('sort') || 'relevance',
  });

  // Sync URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {}) // Reset to page 1 on filter change
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      q: filters.q, // Preserve search query
      page: 1,
      limit: 10,
      sort: 'relevance'
    });
  }, [filters.q]);

  const removeFilter = useCallback((key: keyof SearchFilters) => {
    setFilters(prev => ({
      ...prev,
      [key]: '',
      page: 1
    }));
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
    removeFilter,
    setFilters
  };
};
