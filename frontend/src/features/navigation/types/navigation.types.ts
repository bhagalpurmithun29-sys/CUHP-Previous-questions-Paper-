import { ReactNode } from 'react';

export type NavItemType = 'link' | 'button' | 'tree';

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode | string;
  type?: NavItemType;
  roles?: string[];
  children?: NavItem[];
  badge?: number | string;
  isExpanded?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface NavigationState {
  isSidebarOpen: boolean;
  isMobileDrawerOpen: boolean;
  expandedNodes: string[];
  recentPaths: string[];
  pinnedItems: NavItem[];
}

export type NavigationAction = 
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'TOGGLE_MOBILE_DRAWER' }
  | { type: 'SET_MOBILE_DRAWER'; payload: boolean }
  | { type: 'TOGGLE_NODE'; payload: string }
  | { type: 'ADD_RECENT_PATH'; payload: string }
  | { type: 'TOGGLE_PIN_ITEM'; payload: NavItem };
