import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types/navigation.types';
import { ICONS_MAP } from '../constants/navigation.constants';
import { useNavigation } from '../hooks/useNavigation';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SidebarItemProps {
  item: NavItem;
  depth?: number;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
  const { state, dispatch } = useNavigation();
  const Icon = typeof item.icon === 'string' ? ICONS_MAP[item.icon] : item.icon;
  const isExpanded = state.expandedNodes.includes(item.id);
  const { isSidebarOpen } = state;

  const hasChildren = item.children && item.children.length > 0;

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_NODE', payload: item.id });
    if (!isSidebarOpen) {
      dispatch({ type: 'SET_SIDEBAR', payload: true });
    }
  };

  const linkContent = (
    <>
      <div className="flex items-center">
        {Icon && (
          <span className={`flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'} text-gray-500 group-hover:text-indigo-600 transition-colors`}>
            {/* @ts-ignore */}
            <Icon className="w-5 h-5" />
          </span>
        )}
        
        {isSidebarOpen && (
          <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis font-medium text-sm">
            {item.label}
          </span>
        )}
      </div>

      {isSidebarOpen && (
        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
              {isExpanded ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
            </span>
          )}
        </div>
      )}
    </>
  );

  const baseClasses = `group flex items-center justify-between py-2.5 px-3 my-1 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
    ${depth > 0 ? 'ml-6' : ''}
    ${!isSidebarOpen && depth === 0 ? 'justify-center' : ''}`;

  return (
    <div>
      {hasChildren ? (
        <button 
          onClick={toggleExpand}
          className={`w-full ${baseClasses} ${isExpanded ? 'bg-indigo-50/50 text-indigo-900' : 'text-gray-700 hover:bg-gray-100'}`}
          aria-expanded={isExpanded}
        >
          {linkContent}
        </button>
      ) : item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) => 
            `${baseClasses} ${isActive ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100' : 'text-gray-700 hover:bg-gray-100'}`
          }
          onClick={() => {
            if (window.innerWidth < 1024) dispatch({ type: 'SET_MOBILE_DRAWER', payload: false });
          }}
        >
          {linkContent}
        </NavLink>
      ) : null}

      <AnimatePresence>
        {hasChildren && isExpanded && isSidebarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children!.map((child) => (
              <SidebarItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
