export const SCHOOL_CONSTANTS = {
  MESSAGES: {
    CREATE_SUCCESS: 'School created successfully',
    UPDATE_SUCCESS: 'School updated successfully',
    DELETE_SUCCESS: 'School deleted successfully',
    RESTORE_SUCCESS: 'School restored successfully',
    FETCH_ERROR: 'Failed to fetch schools',
    NOT_FOUND: 'School not found',
  },
  ROUTES: {
    LIST: '/admin/schools',
    CREATE: '/admin/schools/create',
    EDIT: (id: string) => `/admin/schools/${id}/edit`,
    DETAILS: (id: string) => `/admin/schools/${id}`,
  },
  STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    ARCHIVED: 'ARCHIVED',
  }
} as const;
