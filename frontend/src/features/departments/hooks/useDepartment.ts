import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentApi } from '../api/department.api';
import { DepartmentQuery } from '../types/department.types';
import toast from 'react-hot-toast';
import { DEPARTMENT_CONSTANTS } from '../constants/department.constants';

export const useDepartments = (query: DepartmentQuery) => {
  return useQuery({
    queryKey: ['departments', query],
    queryFn: () => departmentApi.getDepartments(query),
    keepPreviousData: true,
  });
};

export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: ['departments', id],
    queryFn: () => departmentApi.getDepartmentById(id),
    enabled: !!id,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentApi.createDepartment,
    onSuccess: () => {
      toast.success(DEPARTMENT_CONSTANTS.MESSAGES.CREATE_SUCCESS);
      queryClient.invalidateQueries(['departments']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create department');
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentApi.updateDepartment,
    onSuccess: (data) => {
      toast.success(DEPARTMENT_CONSTANTS.MESSAGES.UPDATE_SUCCESS);
      queryClient.invalidateQueries(['departments']);
      queryClient.invalidateQueries(['departments', data._id]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update department');
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentApi.deleteDepartment,
    onSuccess: (_, id) => {
      toast.success(DEPARTMENT_CONSTANTS.MESSAGES.DELETE_SUCCESS);
      queryClient.invalidateQueries(['departments']);
      queryClient.invalidateQueries(['departments', id]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete department');
    },
  });
};
