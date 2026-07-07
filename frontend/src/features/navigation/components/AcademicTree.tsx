import React from 'react';
import { NavItem } from '../types/navigation.types';
import { SidebarItem } from './SidebarItem';
import { useNavigation } from '../hooks/useNavigation';

interface AcademicTreeProps {
  rootItem: NavItem;
}

export const AcademicTree: React.FC<AcademicTreeProps> = ({ rootItem }) => {
  const { state } = useNavigation();
  
  if (!state.isSidebarOpen) {
    // Return a simplified icon or minimal version when collapsed
    return <SidebarItem item={{ ...rootItem, children: undefined }} />;
  }
  
  return (
    <div className="relative">
      <div className="absolute left-6 top-10 bottom-4 w-px bg-gray-200"></div>
      <SidebarItem item={rootItem} />
    </div>
  );
};
