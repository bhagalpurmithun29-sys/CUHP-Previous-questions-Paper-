import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { schoolApi } from '../api/school.api';
import { SchoolQuery } from '../types/school.types';
import toast from 'react-hot-toast';
import { SCHOOL_CONSTANTS } from '../constants/school.constants';

export const useSchools = (query: SchoolQuery) => {
  return useQuery({
    queryKey: ['schools', query],
    queryFn: () => schoolApi.getSchools(query),
    keepPreviousData: true,
  });
};

export const useSchool = (id: string) => {
  return useQuery({
    queryKey: ['schools', id],
    queryFn: () => schoolApi.getSchoolById(id),
    enabled: !!id,
  });
};

export const useCreateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schoolApi.createSchool,
    onSuccess: () => {
      toast.success(SCHOOL_CONSTANTS.MESSAGES.CREATE_SUCCESS);
      queryClient.invalidateQueries(['schools']);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create school');
    },
  });
};

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schoolApi.updateSchool,
    onSuccess: (data) => {
      toast.success(SCHOOL_CONSTANTS.MESSAGES.UPDATE_SUCCESS);
      queryClient.invalidateQueries(['schools']);
      queryClient.invalidateQueries(['schools', data._id]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update school');
    },
  });
};

export const useDeleteSchool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: schoolApi.deleteSchool,
    onSuccess: (_, id) => {
      toast.success(SCHOOL_CONSTANTS.MESSAGES.DELETE_SUCCESS);
      queryClient.invalidateQueries(['schools']);
      queryClient.invalidateQueries(['schools', id]);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete school');
    },
  });
};
