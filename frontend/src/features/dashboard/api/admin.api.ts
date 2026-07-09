import { apiClient } from '@/lib/axios';
import { DashboardStatistics, AuditLog, ValidationReport } from '../types/admin.types';

export const adminApi = {
  getStatistics: async (): Promise<DashboardStatistics> => {
    const response = await apiClient.get('/admin/statistics');
    return response.data.data;
  },
  
  getHierarchy: async (): Promise<any[]> => {
    const response = await apiClient.get('/admin/hierarchy');
    return response.data.data;
  },

  getAuditLogs: async (page = 1, limit = 20): Promise<{ logs: AuditLog[], meta: any }> => {
    const response = await apiClient.get('/admin/audit-logs', { params: { page, limit } });
    return response.data.data;
  },

  getValidationReport: async (): Promise<ValidationReport> => {
    const response = await apiClient.get('/admin/validation-report');
    return response.data.data;
  },
};
