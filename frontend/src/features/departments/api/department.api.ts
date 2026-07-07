import { axiosInstance } from '../../../lib/axios';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentQuery, PaginatedDepartments, Department } from '../types/department.types';

export const departmentApi = {
  getDepartments: async (query?: DepartmentQuery): Promise<PaginatedDepartments> => {
    const { data } = await axiosInstance.get('/api/departments', { params: query });
    return data.data; // Assumes ApiResponse
  },

  getDepartmentById: async (id: string): Promise<Department> => {
    const { data } = await axiosInstance.get(`/api/departments/${id}`);
    return data.data;
  },

  getDepartmentsBySchool: async (schoolId: string, query?: Partial<DepartmentQuery>): Promise<PaginatedDepartments> => {
    const { data } = await axiosInstance.get(`/api/departments/school/${schoolId}`, { params: query });
    return data.data;
  },

  createDepartment: async (department: CreateDepartmentDto): Promise<Department> => {
    const { data } = await axiosInstance.post('/api/departments', department);
    return data.data;
  },

  updateDepartment: async ({ id, data }: { id: string; data: UpdateDepartmentDto }): Promise<Department> => {
    const response = await axiosInstance.put(`/api/departments/${id}`, data);
    return response.data.data;
  },

  deleteDepartment: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/api/departments/${id}`);
  },

  restoreDepartment: async (id: string): Promise<Department> => {
    const { data } = await axiosInstance.post(`/api/departments/${id}/restore`);
    return data.data;
  },
};
