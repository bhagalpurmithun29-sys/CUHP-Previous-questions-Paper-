import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { QuickActions } from '../components/dashboard/QuickActions';
import { StatsCards } from '../components/dashboard/StatsCards';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { RecommendationSection } from '../components/dashboard/RecommendationSection';
import { StudyProgress } from '../components/dashboard/StudyProgress';
import { ContinueReading } from '../components/dashboard/ContinueReading';
import { useAuth } from '../features/auth/hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* Header & Welcome Section */}
        <DashboardHeader />
        
        {/* Quick Actions Grid */}
        <QuickActions />

        {/* Statistics / Key Metrics */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Broader Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <RecommendationSection />
            <RecentActivity />
          </div>

          {/* Right Column - Contextual Widgets */}
          <div className="space-y-6 lg:space-y-8">
            <ContinueReading />
            <StudyProgress />
            
            {/* Contextual Widget for Admin / Faculty / Mod */}
            {user?.role === 'ADMIN' && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 rounded-3xl p-6">
                <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-2">System Alerts</h3>
                <p className="text-sm text-orange-800 dark:text-orange-400 mb-4">
                  There are 3 pending user verification requests requiring administrator approval.
                </p>
                <button className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline">
                  Review Requests &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
