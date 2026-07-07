import { UserRole } from '../../../constants';
import { NavItem } from '../types/navigation.types';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  BookOpenIcon, 
  DocumentTextIcon, 
  UsersIcon, 
  ChartBarIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';
import React from 'react';

// Common items for all authenticated users
export const COMMON_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'HomeIcon', // Using string representations to map to actual components in render
    roles: [UserRole.STUDENT, UserRole.MODERATOR, UserRole.ADMIN],
  },
  {
    id: 'academic-tree',
    label: 'Academic Navigation',
    type: 'tree',
    roles: [UserRole.STUDENT, UserRole.MODERATOR, UserRole.ADMIN],
    children: [
      { id: 'schools', label: 'Schools', path: '/schools' },
      { id: 'departments', label: 'Departments', path: '/departments' },
      { id: 'courses', label: 'Courses', path: '/courses' },
      { id: 'semesters', label: 'Semesters', path: '/semesters' },
      { id: 'subjects', label: 'Subjects', path: '/subjects' },
    ]
  },
];

export const MODERATOR_NAV_ITEMS: NavItem[] = [
  {
    id: 'review-uploads',
    label: 'Review Uploads',
    path: '/moderator/review',
    icon: 'DocumentTextIcon',
    badge: 5,
    roles: [UserRole.MODERATOR, UserRole.ADMIN],
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/moderator/reports',
    icon: 'ChartBarIcon',
    roles: [UserRole.MODERATOR, UserRole.ADMIN],
  }
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'management',
    label: 'Management',
    type: 'tree',
    roles: [UserRole.ADMIN],
    icon: 'BuildingLibraryIcon',
    children: [
      { id: 'manage-schools', label: 'Manage Schools', path: '/admin/schools' },
      { id: 'manage-departments', label: 'Manage Departments', path: '/admin/departments' },
      { id: 'manage-courses', label: 'Manage Courses', path: '/admin/courses' },
      { id: 'manage-semesters', label: 'Manage Semesters', path: '/admin/semesters' },
      { id: 'manage-subjects', label: 'Manage Subjects', path: '/admin/subjects' },
    ]
  },
  {
    id: 'users',
    label: 'Users',
    path: '/admin/users',
    icon: 'UsersIcon',
    roles: [UserRole.ADMIN],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/admin/settings',
    icon: 'Cog6ToothIcon',
    roles: [UserRole.ADMIN],
  }
];

export const ICONS_MAP: Record<string, React.FC<any>> = {
  HomeIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon
};
