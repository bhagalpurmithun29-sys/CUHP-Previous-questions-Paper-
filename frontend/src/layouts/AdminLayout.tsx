import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../features/navigation/context/NavigationContext';
import { useRouteTracker } from '../features/navigation/hooks/useNavigation';
import { GlobalSearchModal } from '../features/search/components/GlobalSearchModal';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';

// Helper component to initialize route tracking within context
const RouteTracker = () => {
  useRouteTracker();
  return null;
};

export const AdminLayout: React.FC = () => {
  return (
    <NavigationProvider>
      <RouteTracker />
      <GlobalSearchModal />
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </NavigationProvider>
  );
};

export default AdminLayout;
