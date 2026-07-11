import React from 'react';
import { FiSearch, FiBell, FiPlus, FiMessageSquare, FiMoon, FiSun, FiMenu } from 'react-icons/fi';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

interface TopNavbarProps {
  onMobileMenuClick: () => void;
  isAiPanelOpen: boolean;
  setIsAiPanelOpen: (val: boolean) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onMobileMenuClick, isAiPanelOpen, setIsAiPanelOpen }) => {
  const { user } = useAuth();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onMobileMenuClick}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        
        {/* Global Search */}
        <div className="hidden sm:flex items-center relative max-w-md w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            <FiSearch className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all"
            placeholder="Search papers, subjects, or ask AI..."
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <span className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors">
          <FiPlus /> <span className="hidden lg:inline">Quick Upload</span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>

        <button 
          onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
          className={`p-2 rounded-lg transition-colors relative ${isAiPanelOpen ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          title="Toggle AI Panel"
        >
          <FiMessageSquare className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
        </button>

        <NotificationDropdown />
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

        <ProfileDropdown />
      </div>
    </header>
  );
};
