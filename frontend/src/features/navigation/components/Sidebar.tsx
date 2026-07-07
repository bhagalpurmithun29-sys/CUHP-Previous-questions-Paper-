import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../hooks/useNavigation';
import { useRoles } from '../../auth/hooks/useAuth';
import { COMMON_NAV_ITEMS, MODERATOR_NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants/navigation.constants';
import { SidebarGroup } from './SidebarGroup';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useNavigation();
  const { isModerator, isAdmin } = useRoles();

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: state.isSidebarOpen ? 280 : 80 
      }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      className="hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 z-20 shrink-0"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {state.isSidebarOpen ? (
          <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              CU
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight truncate">Question Bank</span>
          </Link>
        ) : (
          <Link to="/dashboard" className="w-10 h-10 mx-auto rounded bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
            CU
          </Link>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 hide-scrollbar">
        <SidebarGroup title="Academic" items={COMMON_NAV_ITEMS} />
        
        {isModerator && (
          <SidebarGroup title="Moderation" items={MODERATOR_NAV_ITEMS} />
        )}
        
        {isAdmin && (
          <SidebarGroup title="Administration" items={ADMIN_NAV_ITEMS} />
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          aria-label={state.isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {state.isSidebarOpen ? (
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          ) : (
            <ChevronDoubleRightIcon className="w-5 h-5 mx-auto" />
          )}
        </button>
      </div>
    </motion.aside>
  );
};
