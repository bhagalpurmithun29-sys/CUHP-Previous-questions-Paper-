import React, { useState } from 'react';
import { usePromptManagement } from '../hooks/usePromptManagement';
import { PromptList } from '../components/PromptList';
import { PromptEditor } from '../components/PromptEditor';
import { PromptVersionHistory } from '../components/PromptVersionHistory';
import { PromptTester } from '../components/PromptTester';
import { ApprovalWorkflow } from '../components/ApprovalWorkflow';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { TemplateLibrary } from '../components/TemplateLibrary';

export const PromptManagementPage: React.FC = () => {
  const { prompts, isLoading, createPrompt, updatePrompt } = usePromptManagement();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPrompt = prompts?.find(p => p.id === selectedId) || null;

  const handleSave = (data: any) => {
    if (selectedId) {
      updatePrompt.mutate({ id: selectedId, data });
    } else {
      createPrompt.mutate(data, {
        onSuccess: (res) => setSelectedId(res.id)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Prompt Management</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Enterprise Template Library & Version Control Platform</p>
          </div>
          <button 
            onClick={() => setSelectedId(null)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create New Prompt
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)]">
          {/* Left: Prompt List */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <input 
                type="text" 
                placeholder="Search prompts..." 
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
                </div>
              ) : (
                <PromptList prompts={prompts || []} selectedId={selectedId} onSelect={setSelectedId} />
              )}
            </div>
          </div>

          {/* Center: Editor & Workflow */}
          <div className="lg:col-span-6 flex flex-col gap-6 overflow-y-auto pb-10">
            <PromptEditor prompt={selectedPrompt} onSave={handleSave} />
            <ApprovalWorkflow prompt={selectedPrompt} />
            <PromptVersionHistory prompt={selectedPrompt} />
          </div>

          {/* Right: Tester, Metrics & Library */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pb-10">
            <PerformanceMetrics />
            {selectedPrompt && <PromptTester content={selectedPrompt.content} />}
            <TemplateLibrary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptManagementPage;
