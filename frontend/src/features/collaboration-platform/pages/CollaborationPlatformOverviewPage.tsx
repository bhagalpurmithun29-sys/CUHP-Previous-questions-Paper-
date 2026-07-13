import React, { useState } from 'react';
import { useCollaborationPlatform } from '../hooks/useCollaborationPlatform';

export const CollaborationPlatformOverviewPage: React.FC = () => {
  const { health, dependencies, isHealthLoading, validateReadiness } = useCollaborationPlatform();
  const [activeTab, setActiveTab] = useState('ARCHITECTURE');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col gap-6">
        
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Collaboration Platform & Orchestration</h1>
            <p className="text-sm text-gray-500 mt-1">Unified view of the enterprise communication ecosystem and production readiness.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={() => validateReadiness.mutate()}
               className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
             >
               Validate Readiness
             </button>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-2 shrink-0 border-b border-gray-200 dark:border-gray-800">
          {['ARCHITECTURE', 'ORCHESTRATION', 'DEPENDENCIES', 'HEALTH', 'DEPLOYMENT', 'FEATURE_FLAGS'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0">
          {activeTab === 'HEALTH' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Core Infrastructure</h3>
                  {isHealthLoading ? <p>Loading...</p> : (
                    <pre className="text-sm text-gray-600 dark:text-gray-400">
                      {JSON.stringify(health, null, 2)}
                    </pre>
                  )}
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Module Dependencies</h3>
                  <ul className="space-y-2">
                    {dependencies?.map((dep: any, i: number) => (
                      <li key={i} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                        <span className="text-gray-700 dark:text-gray-300">{dep.name}</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold \${dep.status === 'ONLINE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {dep.status} ({dep.latency}ms)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          )}
          {activeTab !== 'HEALTH' && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Render {activeTab.toLowerCase()} component here</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CollaborationPlatformOverviewPage;
