import { axiosInstance } from '../../../lib/axios';
import { CreateSchoolDto, UpdateSchoolDto, SchoolQuery, PaginatedSchools, School } from '../types/school.types';

export const schoolApi = {
  getSchools: async (query?: SchoolQuery): Promise<PaginatedSchools> => {
    const { data } = await axiosInstance.get('/api/schools', { params: query });
    return data.data; // Assumes ApiResponse format
  },

  getSchoolById: async (id: string): Promise<School> => {
    const { data } = await axiosInstance.get(`/api/schools/${id}`);
    return data.data;
  },

  createSchool: async (school: CreateSchoolDto): Promise<School> => {
    const { data } = await axiosInstance.post('/api/schools', school);
    return data.data;
  },

  updateSchool: async ({ id, data }: { id: string; data: UpdateSchoolDto }): Promise<School> => {
    const response = await axiosInstance.put(`/api/schools/${id}`, data);
    return response.data.data;
  },

  deleteSchool: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/schools/${id}`);
  },

  restoreSchool: async (id: string): Promise<School> => {
    const { data } = await axiosInstance.post(`/api/schools/${id}/restore`);
    return data.data;
  },
};
