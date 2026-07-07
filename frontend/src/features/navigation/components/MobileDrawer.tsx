import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigation } from '../hooks/useNavigation';
import { useRoles } from '../../auth/hooks/useAuth';
import { COMMON_NAV_ITEMS, MODERATOR_NAV_ITEMS, ADMIN_NAV_ITEMS } from '../constants/navigation.constants';
import { SidebarGroup } from './SidebarGroup';
import { Link } from 'react-router-dom';

export const MobileDrawer: React.FC = () => {
  const { state, dispatch } = useNavigation();
  const { isModerator, isAdmin } = useRoles();

  return (
    <AnimatePresence>
      {state.isMobileDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => dispatch({ type: 'SET_MOBILE_DRAWER', payload: false })}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col lg:hidden"
          >
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
              <Link to="/dashboard" className="flex items-center gap-2" onClick={() => dispatch({ type: 'SET_MOBILE_DRAWER', payload: false })}>
                <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">
                  CU
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">Question Bank</span>
              </Link>
              <button
                onClick={() => dispatch({ type: 'SET_MOBILE_DRAWER', payload: false })}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
              {/* Note: Mobile Drawer forces sidebar state to open for its own items implicitly through CSS */}
              <div className="nav-force-open">
                <SidebarGroup title="Academic" items={COMMON_NAV_ITEMS} />
                {isModerator && <SidebarGroup title="Moderation" items={MODERATOR_NAV_ITEMS} />}
                {isAdmin && <SidebarGroup title="Administration" items={ADMIN_NAV_ITEMS} />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
