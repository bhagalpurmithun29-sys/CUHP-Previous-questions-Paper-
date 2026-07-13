import React, { useState } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';
import { AccessibilityPreferences } from '../components/AccessibilityPreferences';

export const AccessibilitySettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('PREFERENCES');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accessibility & Inclusive Design</h1>
        <p className="text-sm text-gray-500 mt-1">Configure text scaling, contrast, and navigation preferences.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['PREFERENCES', 'TEXT_SCALING', 'HIGH_CONTRAST', 'REDUCED_MOTION', 'SCREEN_READER', 'VOICE'].map(tab => (
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
        {activeTab === 'PREFERENCES' ? (
           <AccessibilityPreferences />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilitySettingsPage;
