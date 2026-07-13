import React, { useState } from 'react';
import { CameraView } from '../components/CameraView';

export const ScannerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CAMERA');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Scanner</h1>
        <p className="text-sm text-gray-500 mt-1">Capture, enhance, and upload physical papers.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['CAMERA', 'IMPORT', 'BATCH_MODE', 'SETTINGS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors \${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 p-6 flex flex-col">
        {activeTab === 'CAMERA' ? (
           <CameraView />
        ) : (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerPage;
