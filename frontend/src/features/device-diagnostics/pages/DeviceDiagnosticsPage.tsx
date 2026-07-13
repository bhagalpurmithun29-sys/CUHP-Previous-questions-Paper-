import React, { useState, useEffect } from 'react';
import { useDeviceDiagnostics } from '../hooks/useDeviceDiagnostics';
import { SystemOverview } from '../components/SystemOverview';

export const DeviceDiagnosticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SYSTEM_OVERVIEW');
  const { reportCapabilities } = useDeviceDiagnostics();

  useEffect(() => {
    // Collect local device capabilities once on load
    const collectCapabilities = () => {
      const caps = {
        serviceWorker: 'serviceWorker' in navigator,
        indexedDB: 'indexedDB' in window,
        webAuthn: !!window.PublicKeyCredential,
        pushApi: 'PushManager' in window,
        speechApi: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
      };
      // Optimistic reporting to backend
      reportCapabilities.mutate(caps);
    };
    collectCapabilities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <header className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Device Diagnostics</h1>
        <p className="text-sm text-gray-500 mt-1">Check compatibility, storage, network, and browser capabilities.</p>
      </header>

      <div className="flex gap-2 overflow-x-auto p-4 shrink-0 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {['SYSTEM_OVERVIEW', 'BROWSER_CAPABILITIES', 'STORAGE', 'CAMERA', 'MICROPHONE', 'NETWORK', 'PWA', 'WEBAUTHN', 'OFFLINE_SYNC'].map(tab => (
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
        {activeTab === 'SYSTEM_OVERVIEW' ? (
           <SystemOverview />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-white/50 dark:bg-gray-900/50">
            Render {activeTab.toLowerCase()} component here
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDiagnosticsPage;
