import React from 'react';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { useResponsive } from '../hooks/useResponsive';

export const MobileExperiencePage: React.FC = () => {
  const { isMobile, isTablet, isDesktop, orientation } = useResponsive();

  return (
    <ResponsiveLayout>
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Responsive Design System</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Adaptive experience platform validating layout across devices.</p>
        </header>

        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Device Context</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border \${isMobile ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30' : 'bg-gray-50 border-gray-100 dark:bg-gray-800'}`}>
              <h4 className="font-semibold dark:text-white">Mobile</h4>
              <p className="text-sm text-gray-500">{String(isMobile)}</p>
            </div>
            <div className={`p-4 rounded-lg border \${isTablet ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30' : 'bg-gray-50 border-gray-100 dark:bg-gray-800'}`}>
              <h4 className="font-semibold dark:text-white">Tablet</h4>
              <p className="text-sm text-gray-500">{String(isTablet)}</p>
            </div>
            <div className={`p-4 rounded-lg border \${isDesktop ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30' : 'bg-gray-50 border-gray-100 dark:bg-gray-800'}`}>
              <h4 className="font-semibold dark:text-white">Desktop</h4>
              <p className="text-sm text-gray-500">{String(isDesktop)}</p>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50 border-gray-100 dark:bg-gray-800">
              <h4 className="font-semibold dark:text-white">Orientation</h4>
              <p className="text-sm text-gray-500">{orientation}</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Responsive Table Stub</h3>
           <p className="text-sm text-gray-500">Tables collapse into Cards automatically on Mobile devices.</p>
        </section>
      </div>
    </ResponsiveLayout>
  );
};

export default MobileExperiencePage;
