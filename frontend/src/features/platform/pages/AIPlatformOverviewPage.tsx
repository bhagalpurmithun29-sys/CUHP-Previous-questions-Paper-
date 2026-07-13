import React from 'react';
import { usePlatformOverview } from '../hooks/usePlatformOverview';
import { PlatformArchitecture } from '../components/PlatformArchitecture';
import { WorkflowMonitor } from '../components/WorkflowMonitor';
import { SystemDependencies } from '../components/SystemDependencies';
import { FeatureFlags } from '../components/FeatureFlags';
import { HealthChecks } from '../components/HealthChecks';
import { DeploymentStatus } from '../components/DeploymentStatus';
import { IntegrationTests } from '../components/IntegrationTests';
import { ProductionChecklist } from '../components/ProductionChecklist';

export const AIPlatformOverviewPage: React.FC = () => {
  const { overview, health, dependencies, workflows, readiness, isLoading } = usePlatformOverview();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">AI Platform Integration & Orchestration</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">End-to-End Workflows, Health, and Deployment Readiness</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => {}} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
               Run Full Validation
             </button>
          </div>
        </header>

        {/* Top Row: Quick Insights */}
        <PlatformArchitecture data={overview?.orchestration} />
        <HealthChecks health={health} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          
          {/* Left Column: Workflows */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1">
              <WorkflowMonitor workflows={workflows} />
            </div>
          </div>

          {/* Center Column: Integrations & Flags */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="h-[300px]">
              <SystemDependencies dependencies={dependencies} />
            </div>
            <div className="flex-1">
              <FeatureFlags flags={overview?.flags} />
            </div>
          </div>

          {/* Right Column: Deployment Checklist */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <DeploymentStatus readiness={readiness} />
            </div>
            <div className="h-[200px]">
              <IntegrationTests />
            </div>
            <div className="flex-1">
              <ProductionChecklist />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIPlatformOverviewPage;
