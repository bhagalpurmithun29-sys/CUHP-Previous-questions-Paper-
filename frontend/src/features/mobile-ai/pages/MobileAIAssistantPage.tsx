import React, { useState } from 'react';
import { AIChatMobile } from '../components/AIChatMobile';
import { QuickActions } from '../components/QuickActions';

export const MobileAIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CHAT');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Study Companion</h1>
        <p className="text-sm text-gray-500 mt-1">Voice-enabled AI to assist with your academic resources.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['CHAT', 'QUICK_ACTIONS', 'HISTORY', 'CAMERA_TO_AI'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors rounded-full \${activeTab === tab ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        {activeTab === 'CHAT' && <AIChatMobile />}
        {activeTab === 'QUICK_ACTIONS' && <div className="p-6"><QuickActions /></div>}
        {activeTab !== 'CHAT' && activeTab !== 'QUICK_ACTIONS' && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAIAssistantPage;
