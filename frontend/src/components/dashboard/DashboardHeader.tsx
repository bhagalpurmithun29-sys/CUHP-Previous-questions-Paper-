import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {getGreeting()}, <span className="text-primary">{user?.fullName || 'User'}</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
        {user?.role === 'ADMIN' ? 'Manage the system and view analytics.' : 
         user?.role === 'MODERATOR' ? 'Review content and manage community.' :
         'Welcome back to your personalized study workspace.'}
      </p>
    </div>
  );
};
