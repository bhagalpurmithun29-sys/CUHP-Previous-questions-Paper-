import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../features/navigation/context/NavigationContext';
import { Sidebar } from '../features/navigation/components/Sidebar';
import { TopNavigation } from '../features/navigation/components/TopNavigation';
import { MobileDrawer } from '../features/navigation/components/MobileDrawer';
import { Breadcrumbs } from '../features/navigation/components/Breadcrumbs';
import { useRouteTracker } from '../features/navigation/hooks/useNavigation';

// Helper component to initialize route tracking within context
const RouteTracker = () => {
  useRouteTracker();
  return null;
};

export const AdminLayout: React.FC = () => {
  return (
    <NavigationProvider>
      <RouteTracker />
      <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        {/* Mobile Drawer */}
        <MobileDrawer />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <TopNavigation />
          
          <main className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">
              <Breadcrumbs />
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </NavigationProvider>
  );
};

export default AdminLayout;
