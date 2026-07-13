import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { BottomNavigation } from './BottomNavigation';
import { ResponsiveSidebar } from './ResponsiveSidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Desktop/Tablet Sidebar */}
      {!isMobile && <ResponsiveSidebar />}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0 relative">
        <div className="container mx-auto px-4 py-6 md:p-8 max-w-7xl">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNavigation />}
    </div>
  );
};
