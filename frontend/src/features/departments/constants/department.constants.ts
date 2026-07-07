export const DEPARTMENT_CONSTANTS = {
  MESSAGES: {
    CREATE_SUCCESS: 'Department created successfully',
    UPDATE_SUCCESS: 'Department updated successfully',
    DELETE_SUCCESS: 'Department deleted successfully',
    RESTORE_SUCCESS: 'Department restored successfully',
    FETCH_ERROR: 'Failed to fetch departments',
    NOT_FOUND: 'Department not found',
  },
  ROUTES: {
    LIST: '/admin/departments',
    CREATE: '/admin/departments/create',
    EDIT: (id: string) => `/admin/departments/${id}/edit`,
    DETAILS: (id: string) => `/admin/departments/${id}`,
  },
  STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    ARCHIVED: 'ARCHIVED',
  }
} as const;
