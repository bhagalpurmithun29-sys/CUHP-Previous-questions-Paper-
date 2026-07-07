export enum UserRole {
  STUDENT = 'STUDENT',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',
  
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    BROWSE: '/student/papers',
    UPLOAD: '/student/upload',
    SAVED: '/student/saved',
  },
  
  MODERATOR: {
    DASHBOARD: '/moderator/dashboard',
    REVIEW: '/moderator/review',
    REPORTS: '/moderator/reports',
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    DEPARTMENTS: '/admin/departments',
    ANALYTICS: '/admin/analytics',
  }
};
