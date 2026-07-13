import React, { useState } from 'react';
import { useMobilePlatform } from '../hooks/useMobilePlatform';
import { PlatformArchitecture } from '../components/PlatformArchitecture';
import { DeploymentReadiness } from '../components/DeploymentReadiness';
import { WorkflowValidation } from '../components/WorkflowValidation';

export const MobilePlatformOverviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ARCHITECTURE');
  const { overview, isOverviewLoading } = useMobilePlatform();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mobile Platform Integration & Readiness</h1>
          <p className="text-sm text-gray-500 mt-1">End-to-end validation, deployment metrics, and release tracking.</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
           <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">Production Status:</span>
           {isOverviewLoading ? (
              <div className="w-16 h-4 bg-indigo-200 dark:bg-indigo-800 animate-pulse rounded" />
           ) : (
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">
                {overview?.status?.replace(/_/g, ' ')}
              </span>
           )}
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['ARCHITECTURE', 'DEPENDENCY_MAP', 'WORKFLOW_VALIDATION', 'RELEASE_CHECKLIST', 'READINESS', 'FEATURE_MATRIX', 'HEALTH_VALIDATION', 'PRODUCTION_STATUS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors rounded-lg \${activeTab === tab ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 p-6 flex flex-col">
        {activeTab === 'ARCHITECTURE' ? (
           <PlatformArchitecture />
        ) : activeTab === 'READINESS' ? (
           <DeploymentReadiness />
        ) : activeTab === 'WORKFLOW_VALIDATION' ? (
           <WorkflowValidation />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePlatformOverviewPage;
