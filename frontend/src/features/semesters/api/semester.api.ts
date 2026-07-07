import api from '../../../utils/api';
import { ISemester, SemesterQuery, PaginatedResponse } from '../types/semester.types';

export const getSemesters = async (query: SemesterQuery): Promise<PaginatedResponse<ISemester>> => {
  const { data } = await api.get('/semesters', { params: query });
  return data.data; // Assuming ApiResponse unwrapping happens in interceptor or here
};

export const getSemesterById = async (id: string): Promise<ISemester> => {
  const { data } = await api.get(`/semesters/${id}`);
  return data.data;
};

export const createSemester = async (semesterData: Partial<ISemester>): Promise<ISemester> => {
  const { data } = await api.post('/semesters', semesterData);
  return data.data;
};

export const updateSemester = async (id: string, semesterData: Partial<ISemester>): Promise<ISemester> => {
  const { data } = await api.put(`/semesters/${id}`, semesterData);
  return data.data;
};

export const deleteSemester = async (id: string): Promise<void> => {
  await api.delete(`/semesters/${id}`);
};

export const restoreSemester = async (id: string): Promise<ISemester> => {
  const { data } = await api.post(`/semesters/${id}/restore`);
  return data.data;
};

export const activateSemester = async (id: string): Promise<ISemester> => {
  const { data } = await api.post(`/semesters/${id}/activate`);
  return data.data;
};

export const exportSemesters = async (query: SemesterQuery): Promise<Blob> => {
  const { data } = await api.get('/semesters/export', { params: query, responseType: 'blob' });
  return data;
};

export const importSemesters = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/semesters/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
