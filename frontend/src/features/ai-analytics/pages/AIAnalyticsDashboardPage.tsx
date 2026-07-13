import React from 'react';
import { useAIAnalytics } from '../hooks/useAIAnalytics';
import { UsageOverview } from '../components/UsageOverview';
import { FeatureAdoption } from '../components/FeatureAdoption';
import { RoleAnalytics } from '../components/RoleAnalytics';
import { DepartmentAnalytics } from '../components/DepartmentAnalytics';
import { SessionAnalytics } from '../components/SessionAnalytics';
import { ExecutiveKPIs } from '../components/ExecutiveKPIs';
import { ExportReports } from '../components/ExportReports';

export const AIAnalyticsDashboardPage: React.FC = () => {
  const { overview, features, roles, departments, isLoadingOverview } = useAIAnalytics();

  if (isLoadingOverview) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1500px] mx-auto space-y-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">AI Analytics & Intelligence</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Enterprise Usage, Adoption, and Impact KPIs</p>
          </div>
          <div className="flex gap-4">
             {/* Filter Stub */}
             <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
               <option>Last 30 Days</option>
               <option>Last 90 Days</option>
               <option>This Semester</option>
             </select>
          </div>
        </header>

        {/* Top Row: Overview (Aggregates) */}
        <UsageOverview overview={overview} />

        {/* Middle Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <RoleAnalytics data={roles || []} />
          </div>
          <div className="lg:col-span-2">
            <FeatureAdoption data={features || []} />
          </div>
        </div>

        {/* Bottom Row: Dept & Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
          <div className="lg:col-span-2">
            <DepartmentAnalytics data={departments || []} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <SessionAnalytics data={overview} />
            <ExecutiveKPIs data={{ costSavingsHrs: 12500, studentSuccessCorrelation: '+12%', systemUptime: 99.98 }} />
            <ExportReports />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsDashboardPage;
