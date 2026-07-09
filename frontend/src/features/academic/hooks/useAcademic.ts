import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = '/api/v1/academic';

export const useAcademic = () => {
  const queryClient = useQueryClient();

  const useOverview = () => useQuery({
    queryKey: ['academic', 'overview'],
    queryFn: async () => (await axios.get(`${API_BASE}`)).data.data
  });

  const useTree = () => useQuery({
    queryKey: ['academic', 'tree'],
    queryFn: async () => (await axios.get(`${API_BASE}/tree`)).data.data
  });

  const useSchools = () => useQuery({
    queryKey: ['academic', 'schools'],
    queryFn: async () => (await axios.get(`${API_BASE}/schools`)).data.data
  });

  const useCreateSchool = () => useMutation({
    mutationFn: async (data: any) => (await axios.post(`${API_BASE}/school`, data)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic'] })
  });

  const useDepartments = (schoolId?: string) => useQuery({
    queryKey: ['academic', 'departments', schoolId],
    queryFn: async () => (await axios.get(`${API_BASE}/departments`, { params: { schoolId } })).data.data
  });

  const useCreateDepartment = () => useMutation({
    mutationFn: async (data: any) => (await axios.post(`${API_BASE}/department`, data)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic'] })
  });

  const useCourses = (departmentId?: string) => useQuery({
    queryKey: ['academic', 'courses', departmentId],
    queryFn: async () => (await axios.get(`${API_BASE}/courses`, { params: { departmentId } })).data.data
  });

  const useCreateCourse = () => useMutation({
    mutationFn: async (data: any) => (await axios.post(`${API_BASE}/course`, data)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic'] })
  });

  const useSemesters = (courseId?: string) => useQuery({
    queryKey: ['academic', 'semesters', courseId],
    queryFn: async () => (await axios.get(`${API_BASE}/semesters`, { params: { courseId } })).data.data
  });

  const useCreateSemester = () => useMutation({
    mutationFn: async (data: any) => (await axios.post(`${API_BASE}/semester`, data)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic'] })
  });

  const useSubjects = (semesterId?: string) => useQuery({
    queryKey: ['academic', 'subjects', semesterId],
    queryFn: async () => (await axios.get(`${API_BASE}/subjects`, { params: { semesterId } })).data.data
  });

  const useCreateSubject = () => useMutation({
    mutationFn: async (data: any) => (await axios.post(`${API_BASE}/subject`, data)).data.data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic'] })
  });

  return {
    useOverview,
    useTree,
    useSchools,
    useCreateSchool,
    useDepartments,
    useCreateDepartment,
    useCourses,
    useCreateCourse,
    useSemesters,
    useCreateSemester,
    useSubjects,
    useCreateSubject
  };
};
