import React from 'react';
import { NavItem } from '../types/navigation.types';
import { SidebarItem } from './SidebarItem';
import { useNavigation } from '../hooks/useNavigation';
import { AcademicTree } from './AcademicTree';

interface SidebarGroupProps {
  title?: string;
  items: NavItem[];
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, items }) => {
  const { state } = useNavigation();

  if (items.length === 0) return null;

  return (
    <div className="mb-6 px-3">
      {title && state.isSidebarOpen && (
        <h3 className="px-3 mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
          {title}
        </h3>
      )}
      <div className="space-y-0.5">
        {items.map((item) => {
          if (item.type === 'tree') {
             // We can use AcademicTree for deep nested logic or just standard sidebar item recursive
             return (
               <div key={item.id} className="mt-4 mb-2">
                 <AcademicTree rootItem={item} />
               </div>
             );
          }
          return <SidebarItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};
