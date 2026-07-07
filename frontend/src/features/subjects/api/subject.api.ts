import api from '../../../utils/api';
import { ISubject, SubjectQuery, PaginatedResponse } from '../types/subject.types';

export const getSubjects = async (query: SubjectQuery): Promise<PaginatedResponse<ISubject>> => {
  const { data } = await api.get('/subjects', { params: query });
  return data.data; // Assuming ApiResponse unwrapping happens in interceptor or here
};

export const getSubjectById = async (id: string): Promise<ISubject> => {
  const { data } = await api.get(`/subjects/${id}`);
  return data.data;
};

export const createSubject = async (subjectData: Partial<ISubject>): Promise<ISubject> => {
  const { data } = await api.post('/subjects', subjectData);
  return data.data;
};

export const updateSubject = async (id: string, subjectData: Partial<ISubject>): Promise<ISubject> => {
  const { data } = await api.put(`/subjects/${id}`, subjectData);
  return data.data;
};

export const deleteSubject = async (id: string): Promise<void> => {
  await api.delete(`/subjects/${id}`);
};

export const restoreSubject = async (id: string): Promise<ISubject> => {
  const { data } = await api.post(`/subjects/${id}/restore`);
  return data.data;
};

export const duplicateSubject = async (id: string): Promise<ISubject> => {
  const { data } = await api.post(`/subjects/${id}/duplicate`);
  return data.data;
};

export const exportSubjects = async (query: SubjectQuery): Promise<Blob> => {
  const { data } = await api.get('/subjects/export', { params: query, responseType: 'blob' });
  return data;
};

export const importSubjects = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/subjects/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
