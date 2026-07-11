import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const ProfileDropdown: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative">
      <Link to="/profile" className="flex items-center gap-2 pl-2 cursor-pointer group">
        <div className="relative">
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=0D8ABC&color=fff`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm group-hover:ring-2 ring-primary/50 transition-all"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
        </div>
      </Link>
      
      {/* Dropdown content can be added here later */}
    </div>
  );
};
