import api from '../../../utils/api';
import { ICourse, CourseQuery, PaginatedResponse } from '../types/course.types';

export const getCourses = async (query: CourseQuery): Promise<PaginatedResponse<ICourse>> => {
  const { data } = await api.get('/courses', { params: query });
  return data.data; // Assuming ApiResponse unwrapping happens in interceptor or here
};

export const getCourseById = async (id: string): Promise<ICourse> => {
  const { data } = await api.get(`/courses/${id}`);
  return data.data;
};

export const createCourse = async (courseData: Partial<ICourse>): Promise<ICourse> => {
  const { data } = await api.post('/courses', courseData);
  return data.data;
};

export const updateCourse = async (id: string, courseData: Partial<ICourse>): Promise<ICourse> => {
  const { data } = await api.put(`/courses/${id}`, courseData);
  return data.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/courses/${id}`);
};

export const restoreCourse = async (id: string): Promise<ICourse> => {
  const { data } = await api.post(`/courses/${id}/restore`);
  return data.data;
};

export const exportCourses = async (query: CourseQuery): Promise<Blob> => {
  const { data } = await api.get('/courses/export', { params: query, responseType: 'blob' });
  return data;
};

export const importCourses = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/courses/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
