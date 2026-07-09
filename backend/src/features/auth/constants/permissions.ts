import { UserRole } from '../../../enums/auth.enum';

export const Permissions = {
  // Student Permissions
  PAPER_READ: 'paper.read',
  PAPER_DOWNLOAD: 'paper.download',
  PAPER_UPLOAD: 'paper.upload',
  BOOKMARK_CREATE: 'bookmark.create',
  BOOKMARK_DELETE: 'bookmark.delete',
  REPORT_CREATE: 'report.create',
  PROFILE_UPDATE: 'profile.update',

  // Moderator Permissions
  PAPER_APPROVE: 'paper.approve',
  PAPER_REJECT: 'paper.reject',
  PAPER_EDIT: 'paper.edit',
  REPORT_REVIEW: 'report.review',

  // Admin Permissions
  USER_MANAGE: 'user.manage',
  ROLE_MANAGE: 'role.manage',
  DEPARTMENT_MANAGE: 'department.manage',
  COURSE_MANAGE: 'course.manage',
  ANALYTICS_VIEW: 'analytics.view',
  SETTINGS_MANAGE: 'settings.manage',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];

// Role to Permissions Matrix
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.STUDENT]: [
    Permissions.PAPER_READ,
    Permissions.PAPER_DOWNLOAD,
    Permissions.PAPER_UPLOAD,
    Permissions.BOOKMARK_CREATE,
    Permissions.BOOKMARK_DELETE,
    Permissions.REPORT_CREATE,
    Permissions.PROFILE_UPDATE,
  ],
  [UserRole.MODERATOR]: [
    // Inherits Student (In actual implementation we can spread, but defining explicitly for clarity)
    Permissions.PAPER_READ,
    Permissions.PAPER_DOWNLOAD,
    Permissions.PAPER_UPLOAD,
    Permissions.BOOKMARK_CREATE,
    Permissions.BOOKMARK_DELETE,
    Permissions.REPORT_CREATE,
    Permissions.PROFILE_UPDATE,
    // Moderator specifics
    Permissions.PAPER_APPROVE,
    Permissions.PAPER_REJECT,
    Permissions.PAPER_EDIT,
    Permissions.REPORT_REVIEW,
  ],
  [UserRole.ADMIN]: [
    // Admin gets everything. We can list them all or use a helper later, but explicitly listing is safer.
    ...Object.values(Permissions)
  ],
  [UserRole.FACULTY]: [
    Permissions.PAPER_READ,
    Permissions.PAPER_DOWNLOAD,
    Permissions.PAPER_UPLOAD,
    Permissions.PAPER_EDIT,
    Permissions.BOOKMARK_CREATE,
    Permissions.BOOKMARK_DELETE,
    Permissions.PROFILE_UPDATE,
  ],
  [UserRole.SUPER_ADMIN]: [
    ...Object.values(Permissions)
  ],
};
