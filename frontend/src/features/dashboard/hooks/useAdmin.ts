import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api/admin.api';

export const ADMIN_KEYS = {
  all: ['admin'] as const,
  statistics: () => [...ADMIN_KEYS.all, 'statistics'] as const,
  hierarchy: () => [...ADMIN_KEYS.all, 'hierarchy'] as const,
  auditLogs: (page: number, limit: number) => [...ADMIN_KEYS.all, 'auditLogs', page, limit] as const,
  validation: () => [...ADMIN_KEYS.all, 'validation'] as const,
};

export const useAdminStatistics = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.statistics(),
    queryFn: () => adminApi.getStatistics(),
  });
};

export const useAcademicHierarchy = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.hierarchy(),
    queryFn: () => adminApi.getHierarchy(),
  });
};

export const useAuditLogs = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ADMIN_KEYS.auditLogs(page, limit),
    queryFn: () => adminApi.getAuditLogs(page, limit),
  });
};

export const useValidationReport = () => {
  return useQuery({
    queryKey: ADMIN_KEYS.validation(),
    queryFn: () => adminApi.getValidationReport(),
  });
};
