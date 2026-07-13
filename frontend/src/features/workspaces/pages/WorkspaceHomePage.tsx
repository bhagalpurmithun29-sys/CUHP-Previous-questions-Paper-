import React, { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';

export const WorkspaceHomePage: React.FC = () => {
  const { workspaces, isLoadingWorkspaces } = useWorkspace();
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-950">
      
      {/* Sidebar Mock */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-gray-900 dark:text-white">My Workspaces</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoadingWorkspaces ? (
            <p className="text-sm text-gray-500 p-2">Loading...</p>
          ) : (
            workspaces.map((ws: any) => (
              <button 
                key={ws._id}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors truncate"
              >
                {ws.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content Mock */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center px-6 shrink-0">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Computer Science Department</h1>
        </header>

        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 shrink-0">
          <div className="flex gap-6">
            {['OVERVIEW', 'KNOWLEDGE_BOARD', 'RESOURCES', 'MEMBERS'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-semibold transition-colors border-b-2 \${
                  activeTab === tab 
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 min-h-[400px]">
             <h3 className="text-lg font-bold mb-4 dark:text-white">{activeTab.replace('_', ' ')} Content</h3>
             <p className="text-gray-500">Render respective components here (e.g. WorkspaceOverview, KnowledgeBoard)</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WorkspaceHomePage;
