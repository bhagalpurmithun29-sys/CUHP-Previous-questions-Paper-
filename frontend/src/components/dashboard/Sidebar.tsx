import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, FiDatabase, FiSearch, FiBook, FiGrid, 
  FiBookmark, FiDownloadCloud, FiFolder, FiCalendar, 
  FiPieChart, FiUsers, FiSettings, FiHelpCircle, FiLogOut,
  FiCheckSquare
} from 'react-icons/fi';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { UserRole } from '../../constants';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { logout, user } = useAuth();

  const isAdminOrMod = user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR;

  const baseItems = [
    { label: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { label: 'Question Bank', icon: <FiDatabase />, path: '/search' },
    { label: 'AI Search', icon: <FiSearch />, path: '/discovery' },
    { label: 'Subjects', icon: <FiBook />, path: '/subjects' },
    { label: 'Departments', icon: <FiGrid />, path: '/departments' },
  ];

  const studentItems = [
    { label: 'Bookmarks', icon: <FiBookmark />, path: '/bookmarks' },
    { label: 'Downloads', icon: <FiDownloadCloud />, path: '/downloads' },
    { label: 'My Library', icon: <FiFolder />, path: '/library' },
    { label: 'Study Planner', icon: <FiCalendar />, path: '/study-planner' },
  ];

  const adminModItems = [
    { label: 'Review Uploads', icon: <FiCheckSquare />, path: '/moderator/review' },
  ];

  const bottomItems = [
    { label: 'Analytics', icon: <FiPieChart />, path: '/statistics' },
    { label: 'Faculty', icon: <FiUsers />, path: '/faculty-ai' },
    { label: 'Admin', icon: <FiSettings />, path: '/data-management' },
  ];

  const navItems = [
    ...baseItems,
    ...(isAdminOrMod ? adminModItems : studentItems),
    ...bottomItems,
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '5rem' : '16rem' }}
      className="hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full transition-all duration-300 z-20"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              Q
            </div>
            <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight">CUHP Bank</span>
          </motion.div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          <FiGrid className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                isActive 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light font-semibold' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1 shrink-0">
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            } ${isCollapsed ? 'justify-center' : ''}`
          }
        >
          <FiHelpCircle className="text-xl shrink-0" />
          {!isCollapsed && <span className="text-sm truncate">Help & Support</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Help & Support
            </div>
          )}
        </NavLink>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group relative ${isCollapsed ? 'justify-center' : ''}`}
        >
          <FiLogOut className="text-xl shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium truncate">Log out</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Log out
            </div>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
