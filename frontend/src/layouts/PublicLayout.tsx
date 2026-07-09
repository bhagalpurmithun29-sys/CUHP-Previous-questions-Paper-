import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { PublicFooter } from '../components/layout/PublicFooter';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <PublicNavbar />
      
      <main className="flex-1 flex flex-col pt-16">
        <Outlet />
      </main>
      
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
